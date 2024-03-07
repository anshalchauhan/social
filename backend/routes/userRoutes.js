// Web Framework for Node.js
const express = require("express");

// User Controller and Auth Controller
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

// User Router
const router = express.Router();

// APIs
router.post(
  "/follow-unfollow-user/:id",
  authController.protect,
  userController.followUnfollowUser
);
router.patch(
  "/update-user/:id",
  authController.protect,
  userController.updateUser
);
router.get("/profile/:username", userController.getUserProfile);
router.get("/s3", authController.protect, userController.generateUploadUrl);
router.get(
  "/search/:searchQuery",
  authController.protect,
  userController.getUsers
);
router.get(
  "/getFollowing",
  authController.protect,
  userController.getFollowing
);
router.get(
  "/getFollowers",
  authController.protect,
  userController.getFollowers
);

module.exports = router;
