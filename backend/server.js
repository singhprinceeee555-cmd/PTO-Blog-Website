const express = require("express");
const cors = require("cors");
require("dotenv").config();
const postRoutes = require("./routes/postRoutes");
const subscribeRoutes = require("./routes/subscribeRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Blog routes
app.use("/api/posts", postRoutes);
app.use("/api/subscribe", subscribeRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "PTO Blog API is running",
  });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});