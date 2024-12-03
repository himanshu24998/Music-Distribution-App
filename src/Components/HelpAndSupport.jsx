import React, { useState } from "react";
import "./HelpAndSupport.css";
import { Link } from "react-router-dom";

const HelpAndSupport = () => {
  const userId = localStorage.getItem("user_id");

  const [formData, setFormData] = useState({
    subject: "",
    issueType: "",
    message: "",
    file: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("user_id", userId);
    formDataToSubmit.append("subject", formData.subject);
    formDataToSubmit.append("issueType", formData.issueType);
    formDataToSubmit.append("message", formData.message);
    if (formData.file) {
      formDataToSubmit.append("file", formData.file);
    }

    try {
      const response = await fetch("http://localhost:5000/api/help-support", {
        method: "POST",
        body: formDataToSubmit,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json(); // Safely parse JSON
      alert(result.message || "Form submitted successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting the form");
    }
  };

  return (
    <div className="help-support-container">
      <h2 style={{ float: "center" }}>
        Help & Support{" "}
        <Link
          to="/dashboard/view-tickets"
          className="btn btn-outline-primary"
          style={{ float: "right" }}
        >
          View Tickets
        </Link>
      </h2>
      <form onSubmit={handleSubmit} className="help-support-form">
        {/* Subject */}
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            placeholder="Briefly describe your issue"
            required
          />
        </div>

        {/* Issue Type */}
        <div className="form-group">
          <label htmlFor="issueType">Issue Type</label>
          <select
            id="issueType"
            name="issueType"
            value={formData.issueType}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Select an issue type
            </option>
            <option value="technical">Technical Issue</option>
            <option value="billing">Billing</option>
            <option value="feedback">Feedback</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Message */}
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows="5"
            placeholder="Provide a detailed description of your issue"
            required
          ></textarea>
        </div>

        {/* Attach File */}
        <div className="form-group">
          <label htmlFor="file">Attach File (optional)</label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default HelpAndSupport;
