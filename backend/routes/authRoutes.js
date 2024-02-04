// Web Framework for Node.js
const express = require("express");

// Authorization Controller
const authController = require("../controllers/authController");

// Auth Router
const router = express.Router();

// APIs
router.post("/signup", authController.signup, authController.sendOTP);
router.post("/send-otp", authController.sendOTP);
router.patch("/verify-otp", authController.verifyOTP);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.patch(
  "/update-password",
  authController.protect,
  authController.updatePassword
);

module.exports = router;
