import React, { useState } from "react";
import "./Upload.css";

const TrackUpload = () => {
  const user = JSON.parse(localStorage.getItem("user-info"));
  const user_name = user?.name;

  const [formData, setFormData] = useState({
    title: "",
    genre: "Hip-Hop",
    vibe: "Energetic",
    description: "",
    license: "Free with Attribution",
    bpm: "",
    currency: "USD ($)",
    price: "",
    trackSample: null,
    coverArt: null,
    zipFile: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("user_id", localStorage.getItem("user_id"));
    data.append("user_name", user_name);
    data.append("title", formData.title);
    data.append("genre", formData.genre);
    data.append("vibe", formData.vibe);
    data.append("description", formData.description);
    data.append("license", formData.license);
    data.append("bpm", formData.bpm);
    data.append("currency", formData.currency);
    data.append("price", formData.price);
    if (formData.trackSample) data.append("trackSample", formData.trackSample);
    if (formData.coverArt) data.append("coverArt", formData.coverArt);
    if (formData.zipFile) data.append("zipFile", formData.zipFile);

    try {
      const response = await fetch(
        "http://localhost:5000/track-upload/upload",
        {
          method: "POST",
          body: data,
        }
      );

      if (response.ok) {
        const result = await response.json();
        alert(`Track uploaded successfully! Track ID: ${result.track_id}`);
        alert(`verification - Pending`);
      } else {
        const error = await response.json();
        console.error(error);
        alert("Failed to upload track: " + error.error);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while uploading.");
    }
  };

  return (
    <div className="upload-form">
      <form className="row g-3" onSubmit={handleSubmit}>
        {/* Title */}
        <div className="col-md-6">
          <label htmlFor="title" className="form-label">
            Title of Track
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Genre */}
        <div className="col-md-2">
          <label htmlFor="genre" className="form-label">
            Genre
          </label>
          <select
            id="genre"
            name="genre"
            className="form-select"
            value={formData.genre}
            onChange={handleInputChange}
          >
            <option value="Hip-Hop">Hip-Hop</option>
            <option value="Pop">Pop</option>
            <option value="EDM">EDM</option>
            <option value="Jazz">Jazz</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Vibe */}
        <div className="col-md-2">
          <label htmlFor="vibe" className="form-label">
            Vibe
          </label>
          <select
            id="vibe"
            name="vibe"
            className="form-select"
            value={formData.vibe}
            onChange={handleInputChange}
          >
            <option value="Energetic">Energetic</option>
            <option value="Chill">Chill</option>
            <option value="Melancholic">Melancholic</option>
            <option value="Uplifting">Uplifting</option>
          </select>
        </div>

        {/* Description */}
        <div className="col-10 mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            className="form-control"
            placeholder="Adds a personal touch and helps buyers connect with the music"
            value={formData.description}
            onChange={handleInputChange}
            style={{ resize: "none" }}
          ></textarea>
        </div>

        {/* Licensing Options */}
        <div className="col-md-3">
          <label htmlFor="license" className="form-label">
            Licensing Options
          </label>
          <select
            id="license"
            name="license"
            className="form-select"
            value={formData.license}
            onChange={handleInputChange}
          >
            <option value="Free with Attribution">Free with Attribution</option>
            <option value="Personal Use Only">Personal Use Only</option>
            <option value="Commercial Use">Commercial Use</option>
          </select>
        </div>

        {/* BPM */}
        <div className="col-md-1">
          <label htmlFor="bpm" className="form-label">
            BPM
          </label>
          <input
            type="number"
            id="bpm"
            name="bpm"
            className="form-control"
            value={formData.bpm}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Price */}
        <div className="col-md-6 d-flex gap-3">
          <div>
            <label htmlFor="currency" className="form-label">
              Currency
            </label>
            <select
              id="currency"
              name="currency"
              className="form-select "
              value={formData.currency}
              onChange={handleInputChange}
            >
              <option value="USD ($)">USD ($)</option>
              <option value="EUR (€)">EUR (€)</option>
              <option value="JPY (¥)">JPY (¥)</option>
              <option value="INR (₹)">INR (₹)</option>
            </select>
          </div>
          <div>
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              className="form-control"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* File Uploads */}
        <div className="col-md-10">
          <label htmlFor="trackSample" className="form-label">
            Track Sample
          </label>
          <input
            type="file"
            id="trackSample"
            name="trackSample"
            className="form-control"
            accept="audio/*"
            onChange={handleFileChange}
          />
        </div>

        <div className="col-md-10">
          <label htmlFor="coverArt" className="form-label">
            Cover Art
          </label>
          <input
            type="file"
            id="coverArt"
            name="coverArt"
            className="form-control"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <div className="col-md-10">
          <label htmlFor="zipFile" className="form-label">
            Upload Your Track (ZIP/RAR)
          </label>
          <input
            type="file"
            id="zipFile"
            name="zipFile"
            className="form-control"
            accept=".zip,.rar"
            onChange={handleFileChange}
            required
          />
        </div>

        {/* Submit */}
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default TrackUpload;
