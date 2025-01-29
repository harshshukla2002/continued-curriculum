const mongoose = require("mongoose");

const BlacklistSchema = new mongoose.Schema({
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: "7d" }, // Auto-delete after 7 days
});

const blacklistModel =
  mongoose.models.blacklist || mongoose.model("blacklist", BlacklistSchema);

module.exports = { blacklistModel };
