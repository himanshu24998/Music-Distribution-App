const express = require("express");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid"); // For unique track IDs
const Upload = require("../models/TrackUpload"); // Adjust the path to the model
const Track = require("../models/TrackUpload");
const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../TrackUploads")); // Directory for uploads
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// POST route to handle file upload
router.post(
  "/upload",
  upload.fields([
    { name: "trackSample", maxCount: 1 },
    { name: "coverArt", maxCount: 1 },
    { name: "zipFile", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        user_id,
        user_name,
        title,
        genre,
        vibe,
        description,
        license,
        bpm,
        currency,
        price,
      } = req.body;

      // Check if user_id is provided
      if (!user_id) {
        return res.status(400).json({ error: "User ID is required" });
      }

      // Validate uploaded files
      if (!req.files || !req.files.trackSample || !req.files.zipFile) {
        return res
          .status(400)
          .json({ error: "Track sample and ZIP file are required" });
      }

      // Generate a unique track ID
      const track_id = uuidv4();

      // Create a new upload entry
      const newUpload = new Upload({
        track_id,
        user_id, // Assign the user ID from the request
        user_name,
        title,
        genre,
        vibe,
        description,
        licensingOptions: license,
        bpm: parseInt(bpm, 10),
        price: price ? parseFloat(price) : null,
        currency: currency || "USD",
        trackSamplePath: `uploads/${req.files.trackSample[0].filename}`,
        coverArtPath: req.files.coverArt
          ? `uploads/${req.files.coverArt[0].filename}`
          : null,
        zipFilePath: `uploads/${req.files.zipFile[0].filename}`,

        verification: "pending", // Default verification status
      });

      await newUpload.save();

      res
        .status(201)
        .json({ message: "Track uploaded successfully", track_id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to upload track" });
    }
  }
);

// Route to fetch all tracks uploaded by a specific user
router.get("/user/:user_id", async (req, res) => {
  try {
    const userId = req.params.user_id;

    // Fetch tracks for the user from the database
    const tracks = await Track.find({ user_id: userId });

    if (!tracks.length) {
      return res
        .status(404)
        .json({ success: false, message: "No uploads found" });
    }

    // Respond with the user's tracks
    res.status(200).json({ success: true, tracks });
  } catch (error) {
    console.error("Error fetching user uploads:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Route to fetch approved tracks
router.get("/approved-tracks", async (req, res) => {
  try {
    const approvedTracks = await Track.find({ verification: "Approved" });

    if (!approvedTracks.length) {
      return res.json({ message: "No approved tracks available." });
    }

    res.json(approvedTracks); // Send the approved tracks
  } catch (error) {
    console.error("Error fetching approved tracks:", error);
    res.status(500).json({ error: "Failed to fetch approved tracks." });
  }
});

module.exports = router;
