const express = require("express");

const {
  getPosts,
  getPostById,
} = require("../controllers/postController");

const router = express.Router();

// GET all posts
router.get("/", getPosts);

// GET single post
router.get("/:id", getPostById);

module.exports = router;