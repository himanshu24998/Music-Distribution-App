// helpSupportRoutes.js

const express = require("express");
const multer = require("multer");
const HelpSupport = require("../models/helpSupport"); // Import the schema
const router = express.Router();
const path = require("path");

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); // Directory to store files
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// POST route to handle form submission
router.post("/help-support", upload.single("file"), async (req, res) => {
  try {
    const { user_id, subject, issueType, message } = req.body;

    const helpSupportEntry = new HelpSupport({
      user_id,
      subject,
      issueType,
      message,
      filePath: req.file ? req.file.path : null,
      status: "Open",
    });

    await helpSupportEntry.save();

    res.status(201).json({ message: "Issue submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to submit issue" });
  }
});

// GET route to fetch all tickets for a specific user
router.get("/tickets/:userId", async (req, res) => {
  try {
    const { userId } = req.params; // Extract user_id from the route parameters

    // Fetch all tickets for the user
    const tickets = await HelpSupport.find({ user_id: userId });

    res.status(200).json(tickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
});

module.exports = router;
