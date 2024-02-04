// Mongoose is an object modeling tool for MongoDB and Node.js
const mongoose = require("mongoose");

// A module for creating random strings and performing hashing, encryption, decryption
const crypto = require("crypto");

// A library of string validators and sanitizers.
const validator = require("validator");

// A library to help hash passwords
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    verified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      select: false,
    },
    otpExpires: Date,
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 8,
      select: false,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    profilePic: {
      type: String,
      defualt: "",
    },
    followers: {
      type: [String],
      default: [],
    },
    following: {
      type: [String],
      default: [],
    },
    bio: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Middlewares

// Middleware to encrypt user's Password before saving it to the database
userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Encrypting or hashing password with a cost of 12
  this.password = await bcryptjs.hash(this.password, 12);

  next();
});

// Middleware to encrypt user's OTP before saving it to the database
userSchema.pre("save", async function (next) {
  // Only run this function is otp was actually modified
  if (!this.isModified("otp")) return next();

  // Encrypting or hashing otp with a cost of 12
  this.otp = await bcryptjs.hash(this.otp, 12);

  next();
});

// Instance Methods

// Method to check if the entered Password is correct during Login
userSchema.methods.correctPassword = async function (
  enteredPassword,
  password
) {
  // this keyword not available because we have set password field to false.
  return await bcryptjs.compare(enteredPassword, password);
};

// Method to check if the entered OTP is correct
userSchema.methods.correctOtp = async function (enteredOtp, otp) {
  // this keyword not available because we have set otp field to false.
  return await bcryptjs.compare(enteredOtp, otp);
};

// Method to check if the user has changed his/her password after receiving the token
userSchema.methods.changedPassword = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedPasswordTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedPasswordTimestamp;
  }

  return false;
};

// Method for generating the random reset token
userSchema.methods.createPasswordResetToken = function () {
  // not necessary to be as strong as the normal token
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
