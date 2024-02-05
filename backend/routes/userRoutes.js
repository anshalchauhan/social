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

router.post(
  "/update-user/:id",
  authController.protect,
  userController.updateUser
);

router.get("/user-profile/:username", userController.getUserProfile);

module.exports = router;
