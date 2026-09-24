const fs = require("fs");
const path = require("path");

const subscribersFile = path.join(
  __dirname,
  "../data/subscribers.json"
);

// Subscribe user
const subscribe = (req, res) => {
  const { email } = req.body;

  // Check email
  if (!email) {
    return res.status(400).json({
      message: "Email is required",
    });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Please enter a valid email address",
    });
  }

  // Read existing subscribers
  let subscribers = [];

  try {
    if (fs.existsSync(subscribersFile)) {
      const data = fs.readFileSync(subscribersFile, "utf8");
      subscribers = data ? JSON.parse(data) : [];
    }
  } catch (error) {
    return res.status(500).json({
      message: "Could not read subscribers",
    });
  }

  // Check duplicate email
  if (subscribers.includes(email)) {
    return res.status(409).json({
      message: "This email is already subscribed",
    });
  }

  // Add email
  subscribers.push(email);

  // Save email
  try {
    fs.writeFileSync(
      subscribersFile,
      JSON.stringify(subscribers, null, 2)
    );
  } catch (error) {
    return res.status(500).json({
      message: "Could not save email",
    });
  }

  res.status(201).json({
    message: "Successfully subscribed!",
  });
};

module.exports = {
  subscribe,
};