const express = require("express");
const fs = require("fs");

const app = express();
const SECRET = "ONLY_FOR_HER_2026";

app.get("/messages", (req, res) => {
  if (req.headers["x-secret-key"] !== SECRET) {
    return res.status(403).send("Forbidden");
  }

  const data = fs.readFileSync("messages.json", "utf8");
  res.json(JSON.parse(data));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running");
});
