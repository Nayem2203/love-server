const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const SECRET = "ONLY_FOR_HER_2026";

// Absolute path to messages.json (VERY IMPORTANT FIX)
const messagesPath = path.join(__dirname, "messages.json");

// Health check route (for browser testing)
app.get("/", (req, res) => {
  res.send("Love server is running ❤️");
});

// Private messages API
app.get("/messages", (req, res) => {
  const key = req.headers["x-secret-key"];

  if (key !== SECRET) {
    return res.status(403).send("Forbidden");
  }

  try {
    // Read fresh file every request (no cache)
    const data = fs.readFileSync(messagesPath, "utf8");

    // Parse to ensure valid JSON
    const json = JSON.parse(data);

    // Disable caching (IMPORTANT)
    res.setHeader("Cache-Control", "no-store");

    res.json(json);
  } catch (err) {
    console.error("Error reading messages.json:", err);
    res.status(500).json({
      error: "messages.json is invalid or missing",
    });
  }
});

// Render uses dynamic port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
