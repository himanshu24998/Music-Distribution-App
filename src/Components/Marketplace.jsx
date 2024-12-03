import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlay } from "react-icons/fa"; // Font Awesome Play Icon
import H5AudioPlayer from "react-h5-audio-player"; // Import the library
import "react-h5-audio-player/lib/styles.css"; // Include default styles

const Marketplace = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [musicList, setMusicList] = useState([]);
  const [filteredMusicList, setFilteredMusicList] = useState([]); // Ensure it's initialized as an empty array
  const [currentTrack, setCurrentTrack] = useState(null); // For currently selected track

  useEffect(() => {
    // Fetch all approved tracks
    const fetchTracks = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/tracks/approved-tracks"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch tracks.");
        }
        const data = await response.json();
        setMusicList(data); // Populate musicList with approved tracks
        setFilteredMusicList(data); // Initial display matches all tracks
      } catch (error) {
        console.error("Error fetching approved tracks:", error);
      }
    };

    fetchTracks();
  }, []);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filteredTracks = musicList.filter(
      (track) =>
        track.title.toLowerCase().includes(query) ||
        track.user_id.toLowerCase().includes(query)
    );
    setFilteredMusicList(filteredTracks);
  };

  const handleFilterChange = (type, value) => {
    let updatedList = musicList;
    if (type === "genre" && value) {
      updatedList = updatedList.filter((track) => track.genre === value);
    }
    if (type === "price" && value) {
      updatedList = updatedList.filter((track) => {
        const price = track.price || 0; // Default price to 0 if undefined
        if (value === "0-5") return price >= 0 && price <= 5;
        if (value === "5-10") return price > 5 && price <= 10;
        if (value === "10+") return price > 10;
        return true;
      });
    }
    setFilteredMusicList(updatedList);
  };

  const handleBuyClick = (id) => {
    navigate(`/purchase/${id}`);
  };

  const handlePlayClick = (music) => {
    const trackUrl = `http://localhost:5000/${music.trackSamplePath}`;
    console.log("Playing music:", trackUrl);
    setCurrentTrack(trackUrl);
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="search-bar w-75">
          <input
            type="text"
            className="form-control"
            placeholder="Search music..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={handleSearch}
          />
        </div>

        <button
          className="btn btn-outline-secondary"
          data-bs-toggle="modal"
          data-bs-target="#filterModal"
        >
          Filters
        </button>
      </div>

      {/* Displaying Music Tracks */}
      <div className="music-list">
        <div className="list-group">
          {Array.isArray(filteredMusicList) &&
          filteredMusicList.length === 0 ? (
            <div className="alert alert-info" role="alert">
              No tracks available. Try modifying the filters or search.
            </div>
          ) : (
            Array.isArray(filteredMusicList) &&
            filteredMusicList.map((music) => (
              <div
                key={music._id} // Use MongoDB's `_id` field as a unique key
                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
              >
                <div className="d-flex align-items-center">
                  {/* Play Button */}
                  <button
                    className="btn btn-secondary me-3 play-button"
                    onClick={() => handlePlayClick(music)}
                  >
                    <FaPlay />
                  </button>

                  {/* Track Info */}
                  <div className="track-info">
                    <h5 className="mb-1">{music.title}</h5>
                    <p className="mb-0 text-muted">{music.user_name}</p>
                  </div>
                </div>

                {/* Price and Buy Button */}
                <div className="d-flex align-items-center">
                  <span className="price me-3">
                    {music.price ? `$${music.price.toFixed(2)}` : "Free"}
                  </span>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleBuyClick(music._id)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Music Player */}
      {currentTrack && (
        <div className="mt-4">
          <H5AudioPlayer
            src={currentTrack} // Track sample path (now a URL)
            autoPlay
            controls
            onPlay={() => console.log("Playing...")}
          />
        </div>
      )}

      {/* Filter Modal */}
      <div
        className="modal fade"
        id="filterModal"
        tabIndex="-1"
        aria-labelledby="filterModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="filterModalLabel">
                Filters
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Genre</label>
                <select
                  className="form-select"
                  value={selectedGenre}
                  onChange={(e) => handleFilterChange("genre", e.target.value)}
                >
                  <option value="">All Genres</option>
                  <option value="Chill">Chill</option>
                  <option value="Pop">Pop</option>
                  <option value="Soul">Soul</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Price Range</label>
                <select
                  className="form-select"
                  value={selectedPriceRange}
                  onChange={(e) => handleFilterChange("price", e.target.value)}
                >
                  <option value="">All Prices</option>
                  <option value="0-5">$0 - $5</option>
                  <option value="5-10">$5 - $10</option>
                  <option value="10+">$10+</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => console.log("Filters applied!")}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
