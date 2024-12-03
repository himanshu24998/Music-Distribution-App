const mongoose = require("mongoose");

const trackUploadSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  user_name: { type: String, required: true },
  track_id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  genre: { type: String, required: true },
  vibe: { type: String, required: true },
  description: { type: String },
  licensingOptions: { type: String, required: true },
  bpm: { type: Number },
  price: { type: Number },
  currency: { type: String, default: "USD" },
  trackSamplePath: { type: String, required: true },
  coverArtPath: { type: String },
  zipFilePath: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  verification: { type: String, default: "pending" },
});

module.exports = mongoose.model("TrackUpload", trackUploadSchema);
