import React, { useEffect, useState } from "react";
import "./MyUploads.css";
import { Link } from "react-router-dom";

const MyUploads = () => {
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "status-green";
      case "rejected":
        return "status-red";
      default:
        return "status-yellow";
    }
  };

  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("user_id"); // Retrieve the user ID from localStorage

    if (!userId) {
      setError("User ID not found. Please log in.");
      setLoading(false);
      return;
    }

    // Fetch uploads for the logged-in user
    fetch(`http://localhost:5000/api/tracks/user/${userId}`) // Ensure this matches your server URL
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse JSON response
      })
      .then((data) => {
        if (data.success) {
          setUploads(data.tracks);
        } else {
          setError(data.message || "Failed to load uploads.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching uploads:", err);
        setError("An error occurred while fetching your uploads.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading your uploads...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="uploads-container">
      <div className="header">
        <h2>My Uploads</h2>
        <Link to="/dashboard/upload" className="btn btn-outline-primary">
          + Upload New Beat
        </Link>
      </div>

      {uploads.length === 0 ? (
        <div className="no-uploads-message">
          <h3>You haven't uploaded any tracks yet!</h3>
          <p>
            Start sharing your music with the world by clicking the "Upload New
            Beat" button above.
          </p>
        </div>
      ) : (
        <table className="uploads-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Genre</th>
              <th>Verification Status</th>
              <th>Uploaded</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {uploads.map((track, index) => (
              <tr key={track._id}>
                <td>{index + 1}</td>
                <td>{track.title}</td>
                <td>{track.genre}</td>
                {/* <td>{track.verification}</td> */}
                <td
                  style={{ margin: "15px" }}
                  className={`status-badge ${getStatusClass(
                    track.verification.toLowerCase()
                  )}`}
                >
                  {track.verification}
                </td>
                <td>
                  {new Date(track.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td>
                  <button className="action-button edit">Edit</button>
                  <button className="action-button delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyUploads;
