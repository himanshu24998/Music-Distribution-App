const mongoose = require("mongoose");

const helpSupportSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    subject: { type: String, required: true },
    issueType: { type: String, required: true },
    message: { type: String, required: true },
    filePath: { type: String, required: false },
    status: { type: String, default: "Open" },
  },
  { timestamps: true }
);

const HelpSupport = mongoose.model("HelpSupport", helpSupportSchema);

module.exports = HelpSupport;
