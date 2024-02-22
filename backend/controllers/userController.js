// A module for creating random strings and performing hashing, encryption, decryption
const crypto = require("crypto");

// util module
const { promisify } = require("util");

// Error Handling
// catchAsync function to handle catch blocks, we will wrap all our handler(controller) functions in this
const catchAsync = require("../utils/catchAsync");

// Error Class
const AppError = require("../utils/appError");

// Models
// User
const User = require("../models/userModel");
// Post
// const Post = require("../models/postModel");

// AWS
// S3
const s3 = require("../aws/s3");

exports.followUnfollowUser = catchAsync(async (req, res, next) => {
  // 1> Get the id for current user and user which has to be followed or unfollowed
  const { id } = req.params;
  const userToModify = await User.findById(id);
  const currentUser = await User.findById(req.user._id);

  // 2> Check if current User id and follower user id is same or not
  if (id === req.user._id.toString())
    return next(new AppError("You cannot follow yourself!", 400));

  // 3> Check if both user exists
  if (!userToModify || !currentUser)
    return next(new AppError("User not found!", 400));

  // 4> If everything checked follow or unfollow user

  const isFollowing = currentUser.following.includes(id);

  if (isFollowing) {
    // Unfollow user
    // Modify both users
    await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
    await User.findByIdAndUpdate(id, {
      $pull: { followers: req.user._id },
    });
    res.status(200).json({
      status: "success",
      message: "Unfollowed successfully!",
    });
  } else {
    // Follow user
    // Modify both user
    await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
    await User.findByIdAndUpdate(id, {
      $push: { followers: req.user._id },
    });
    res.status(200).json({
      status: "success",
      message: "Followed successfully!",
    });
  }
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { name, username, password, profilePic, bio } = req.body;

  let user = await User.findById(req.user._id).select("+password");

  //   1> Check if user exists
  if (!user) return next(new AppError("User does not exist", 404));

  // 2> Check if the user is not updating other user profile
  if (req.params.id !== req.user._id.toString())
    return next(new AppError("You cannot update other user's profile", 401));

  // 3> Update user
  user.name = name || user.name;
  user.username = username || user.username;
  user.password = password || user.password;
  user.bio = bio || user.bio;
  user.profilePic = profilePic || user.profilePic;

  user = await user.save();
  res.status(200).json({
    status: "success",
    message: "Profile updated successfully",
    user,
  });
});

exports.getUserProfile = catchAsync(async (req, res, next) => {
  const { username } = req.params;

  const user = await User.findOne({ username })
    .select("-password")
    .select("-updatedAt");

  if (!user) return next(new AppError("User does not exist", 404));

  res.status(200).json({
    status: "success",
    user: user,
    message: "User profile searched successfully!",
  });
});

exports.generateUploadUrl = catchAsync(async (req, res, next) => {
  // 1> Create a unique image name
  // Promisifying randombytes function
  const randomBytes = promisify(crypto.randomBytes);
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString("hex");

  // 2 Specify the parameters
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: imageName,
    Expires: 60,
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);

  res.status(200).json({
    status: "success",
    url: uploadURL,
    message: "Upload Url created!",
  });
});
