import { useNavigate } from "react-router-dom";

const Home = () => {
  const userStats = {
    uploadedMusic: 12,
    totalDuration: "45:30", // in HH:MM format
    ownedTracks: 8,
    recentBuyers: ["Alice", "Bob", "Charlie"],
  };

  const navigate = useNavigate();

  const handleUpload = () => {
    navigate("/dashboard/trackUpload");
  };

  const handleMaketplace = () => {
    navigate("/dashboard/marketplace");
  };

  return (
    <div className="homepage text-black">
      {/* Hero Section */}
      <section className="hero text-center py-5">
        <h1 className="display-4 text-gradient">
          Empower Your Sound, Redefine Creativity
        </h1>
        <p className="lead my-4">
          Share your music, secure your rights, and monetize your talent.
        </p>
        <div>
          <button
            className="btn btn-primary btn-lg me-3"
            onClick={handleUpload}
          >
            Upload Your Beat
          </button>
          <button
            className="btn btn-outline-dark btn-lg"
            onClick={handleMaketplace}
          >
            Explore Marketplace
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features py-5">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4">
              <i className="bi bi-upload fs-1 mb-3 text-info"></i>
              <h4>Upload Your Music</h4>
              <p>
                Showcase your creativity and share your beats with the world.
              </p>
            </div>
            <div className="col-md-4">
              <i className="bi bi-shield-check fs-1 mb-3 text-success"></i>
              <h4>Get Licensed</h4>
              <p>Secure copyrights and ensure your work is protected.</p>
            </div>
            <div className="col-md-4">
              <i className="bi bi-cash-stack fs-1 mb-3 text-warning"></i>
              <h4>Monetize Creativity</h4>
              <p>Sell your beats, grow your audience, and earn revenue.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Beats Section */}
      <section className="trending py-5 bg-secondary">
        <div className="container">
          <h2 className="text-center mb-4">Trending Beats</h2>
          <div className="row">
            {[1, 2, 3].map((beat, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card bg-dark text-white">
                  <img
                    src={`https://via.placeholder.com/300?text=Beat+Cover+${
                      index + 1
                    }`}
                    className="card-img-top"
                    alt="Beat Cover"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Beat Title {index + 1}</h5>
                    <p className="card-text">Creator Name</p>
                    <button className="btn btn-primary me-2">Preview</button>
                    <button className="btn btn-outline-light">Buy</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Stats Section */}
      <section className="user-stats py-5">
        <div className="container">
          <h2 className="text-center mb-4">Your Stats</h2>
          <div className="row text-center">
            <div className="col-md-3">
              <div className="stat-card p-3 bg-dark text-white rounded">
                <h4>{userStats.uploadedMusic}</h4>
                <p>Tracks Uploaded</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-card p-3 bg-dark text-white rounded">
                <h4>{userStats.totalDuration}</h4>
                <p>Total Duration</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-card p-3 bg-dark text-white rounded">
                <h4>{userStats.ownedTracks}</h4>
                <p>Tracks Owned</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-card p-3 bg-dark text-white rounded">
                <h4>Recent Buyers</h4>
                <ul className="list-unstyled">
                  {userStats.recentBuyers.map((buyer, index) => (
                    <li key={index}>{buyer}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
