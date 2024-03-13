// Web Framework for Node.js
const express = require("express");

// Authorization Controller
const authController = require("../controllers/authController");

// Auth Router
const router = express.Router();

// APIs
router.post("/signup", authController.signup, authController.sendOTP);
router.patch("/verify-otp", authController.verifyOTP);
router.post("/login", authController.login);
router.post("/logout", authController.protect, authController.logout);
router.post("/forgot-password", authController.forgotPassword);
router.patch("/reset-password/:token", authController.resetPassword);

module.exports = router;
