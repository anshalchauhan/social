// Web Framework for Node.js
const express = require("express");

// Controllers
const authController = require("../controllers/authController");
// Post Controller
const postController = require("../controllers/postController");

// Post Router
const router = express.Router();

// APIs
router.post("/create-post", authController.protect, postController.createPost);
router.get("/:id", postController.getPost);
router.delete("/:id", authController.protect, postController.deletePost);
router.post("/like/:id", authController.protect, postController.likeUnlikePost);
router.post("/reply/:id", authController.protect, postController.replyToPost);
router.post("/feed", authController.protect, postController.getFeedPosts);

module.exports = router;
