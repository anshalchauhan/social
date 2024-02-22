// Error Handling
// catchAsync function to handle catch blocks, we will wrap all our handler(controller) functions in this
const catchAsync = require("../utils/catchAsync");

// Error Class
const AppError = require("../utils/appError");

// Model
// User
const User = require("../models/userModel");
// Post
const Post = require("../models/postModel");

// Post Controllers

// Creating Post
exports.createPost = catchAsync(async (req, res, next) => {
  const { postedBy, text, media, type } = req.body;

  // 1> Check if postedBy and text is provided
  if (!postedBy || !text) {
    return next(new AppError("Please provide text", 400));
  }

  // 2> Check if user exists
  const user = await User.findById(postedBy);
  if (!user) {
    return next(new AppError("User not found!", 404));
  }

  // 3> Creating a post for someone else should not be allowed
  if (user._id.toString() !== req.user._id.toString()) {
    return next(new AppError("Unauthorized to create post"));
  }

  // 4> If everything is checked
  const newPost = await Post.create({ postedBy, text, media, type });
  await newPost.save();

  res.status(200).json({
    status: "success",
    message: "Post created successfully!",
    post: newPost,
  });
});

// Getting Post
exports.getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  // 1> If post exist
  if (!post) {
    return next(new AppError("Post not found", 404));
  }

  res.status(200).json({
    status: "success",
    post,
  });
});

// Deleting Post
exports.deletePost = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findById(id);

  // 1> Check if post exist
  if (!post) {
    return next(new AppError("Post not found!", 404));
  }

  // 2> Check if person deleting the post is owner of post
  if (post.postedBy.toString() !== req.user._id.toString()) {
    return next(new AppError("Unauthorized to delete post", 401));
  }

  await Post.findByIdAndDelete(id);

  res.status(200).json({
    status: "success",
    message: "Post deleted successfully",
  });
});

// Like Unlike Post
exports.likeUnlikePost = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  const post = await Post.findById(id);

  // 1> Check if post exists
  if (!post) {
    return next(new AppError("Post not found", 404));
  }

  const userLikedPost = post.likes.includes(userId);

  if (userLikedPost) {
    // Unlike Post
    await Post.updateOne({ _id: id }, { $pull: { likes: userId } });
    res.status(200).json({
      status: "success",
      message: "Post unliked successfully!",
    });
  } else {
    // Like Post
    post.likes.push(userId);
    await post.save();
    res.status(200).json({
      status: "success",
      message: "Post liked successfully!",
    });
  }
});

// Reply To Post
exports.replyToPost = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { text } = req.body;
  const { _id: userId, username, profilePic } = req.user;

  // If reply text field is not provided
  if (!text) {
    return next(new AppError("Reply text is required!", 400));
  }

  const post = await Post.findById(id);
  if (!post) {
    return next(new AppError("Post not found!", 404));
  }

  const reply = { userId, text, profilePic, username };
  post.replies.push(reply);
  await post.save();

  res.status(200).json({
    status: "success",
    message: "Reply added successfully!",
  });
});

// Get User Posts
exports.getUserPosts = catchAsync(async (req, res, next) => {
  const { username } = req.body;
  const user = await User.findOne({ username });

  // 1> Check if user exists
  if (!user) {
    return next(new AppError("User not found!", 404));
  }

  const userPosts = await Post.find({
    postedBy: user._id,
  }).sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    message: "User posts loaded successfully!",
    posts: userPosts,
  });
});

// Get Feed Posts
exports.getFeedPosts = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  // 1> Check if user exists
  if (!user) {
    return next(new AppError("User not found!", 404));
  }

  const { following } = user;
  const feedPosts = await Post.find({
    postedBy: { $in: [user._id, following] },
  }).sort({
    createdAt: -1,
  });

  res.status(200).json({
    status: "success",
    message: "Feed loaded successfully!",
    feed: feedPosts,
  });
});
