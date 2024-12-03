import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaDownload } from "react-icons/fa"; // Font Awesome Download Icon

const MyPurchases = () => {
  const navigate = useNavigate();

  // Raw data for purchased music tracks
  const [purchases] = useState([
    {
      _id: "1",
      title: "Dreamy Vibes",
      artistName: "DJ Chill",
      coverImage: "https://via.placeholder.com/80",
      description: "A chill and relaxing track for your moments of calm.",
      price: 9.99,
      trackUrl: "http://localhost:5000/uploads/dreamy-vibes.mp3", // Replace with actual path
    },
    {
      _id: "2",
      title: "Energetic Beats",
      artistName: "BeatzKing",
      coverImage: "https://via.placeholder.com/80",
      description: "High-energy beats to keep you pumped all day long.",
      price: 14.99,
      trackUrl: "http://localhost:5000/uploads/energetic-beats.mp3",
    },
    {
      _id: "3",
      title: "Soulful Melodies",
      artistName: "SoulArtist",
      coverImage: "https://via.placeholder.com/80",
      description: "Melodies that touch your soul and uplift your spirit.",
      price: 7.99,
      trackUrl: "http://localhost:5000/uploads/soulful-melodies.mp3",
    },
  ]);

  const handleViewDetails = (id) => {
    navigate(`/purchase-details/${id}`);
  };

  const handleDownload = (url) => {
    // Trigger file download
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop(); // Extract filename from URL
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">My Purchases</h1>

      {purchases.length === 0 ? (
        <div className="alert alert-info" role="alert">
          You haven't purchased any music yet.
        </div>
      ) : (
        <div className="list-group">
          {purchases.map((purchase) => (
            <div
              key={purchase._id}
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            >
              <div className="d-flex align-items-center">
                <img
                  src={purchase.coverImage || "default-music-cover.jpg"}
                  alt={purchase.title}
                  className="img-thumbnail me-3"
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
                <div>
                  <h5 className="mb-1">{purchase.title}</h5>
                  <p className="mb-0 text-muted">
                    By: {purchase.artistName || "Unknown Artist"}
                  </p>
                </div>
              </div>

              <div>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleViewDetails(purchase._id)}
                >
                  View More Details
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => handleDownload(purchase.trackUrl)}
                >
                  <FaDownload className="me-0" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPurchases;
