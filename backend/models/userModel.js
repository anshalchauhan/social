// Mongoose is an object modeling tool for MongoDB and Node.js
const mongoose = require("mongoose");

// A module for creating random strings and performing hashing, encryption, decryption
// const crypto = require("crypto");

// A library of string validators and sanitizers.
const validator = require("validator");

// A library to help hash passwords
// const bcryptjs = require("bcryptjs");

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
      validate: [validator.isEmail, "Please provide a valida email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 8,
      select: false,
    },
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

const User = mongoose.model("User", userSchema);
module.exports = User;
