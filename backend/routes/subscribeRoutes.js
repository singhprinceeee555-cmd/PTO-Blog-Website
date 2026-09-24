const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const subscribersFile = path.join(__dirname, "../data/subscribers.json");

router.post("/", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Email is required",
    });
  }

  const subscribers = JSON.parse(
    fs.readFileSync(subscribersFile, "utf8")
  );

  if (subscribers.includes(email)) {
    return res.status(409).json({
      message: "Email already subscribed",
    });
  }

  subscribers.push(email);

  fs.writeFileSync(
    subscribersFile,
    JSON.stringify(subscribers, null, 2)
  );

  res.status(201).json({
    message: "Successfully subscribed",
    email: email,
  });
});

module.exports = router;