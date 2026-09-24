const posts = require("../data/posts");

// Get all posts
const getPosts = (req, res) => {
  res.json(posts);
};

// Get one post by ID
const getPostById = (req, res) => {
  const post = posts.find((p) => p.id === Number(req.params.id));

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  res.json(post);
};

module.exports = {
  getPosts,
  getPostById,
};