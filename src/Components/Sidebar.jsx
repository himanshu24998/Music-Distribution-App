import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Components_Css.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    if (userEmail) {
      setEmail(userEmail);
    }
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user-info"));
    setUserInfo(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user-info");
    navigate("/login");
  };

  function toggleDropdown() {
    var dropdownContent = document.getElementById("dropdown-content");
    dropdownContent.style.display =
      dropdownContent.style.display === "block" ? "none" : "block";
  }

  // Close the dropdown if clicked outside
  window.onclick = function (event) {
    if (!event.target.matches(".dropdown-btn")) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.style.display === "block") {
          openDropdown.style.display = "none";
        }
      }
    }
  };
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary sidebar-css"
      style={{ width: "280px" }}
    >
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
      >
        <svg className="bi pe-none me-2" width="40" height="32">
          <use xlinkHref="#bootstrap"></use>
        </svg>
        <span className="fs-4">TuneVault</span>
      </a>
      <hr />
      <ul
        className="nav nav-pills flex-column mb-auto"
        style={{ marginTop: "10px" }}
      >
        <li className="nav-item">
          <Link
            to={"/dashboard/home"}
            className={`nav-link text-black ${
              window.location.pathname === "/dashboard/home"
                ? "active text-white"
                : ""
            }`}
            aria-current="page"
          >
            <svg className="bi pe-none me-2" width="16" height="16">
              <use xlinkHref="#home"></use>
            </svg>
            Home
          </Link>
        </li>
        <li>
          <Link
            to={"/dashboard/marketplace"}
            className={`nav-link text-black ${
              window.location.pathname === "/dashboard/marketplace"
                ? "active text-white"
                : ""
            }`}
          >
            <svg className="bi pe-none me-2" width="16" height="16">
              <use xlinkHref="#grid"></use>
            </svg>
            Marketplace
          </Link>
        </li>
        <li>
          <Link
            to={"/dashboard/trackUpload"}
            className={`nav-link text-black ${
              window.location.pathname === "/dashboard/trackUpload"
                ? "active text-white"
                : ""
            }`}
          >
            <svg className="bi pe-none me-2" width="16" height="16">
              <use xlinkHref="#speedometer2"></use>
            </svg>
            Upload Track
          </Link>
        </li>
        <li>
          <Link
            to={"/dashboard/my-uploads"}
            className={`nav-link text-black ${
              window.location.pathname === "/dashboard/my-uploads"
                ? "active text-white"
                : ""
            }`}
          >
            <svg className="bi pe-none me-2" width="16" height="16">
              <use xlinkHref="#table"></use>
            </svg>
            My Uploads
          </Link>
        </li>

        <li>
          <Link
            to={"/dashboard/my-purchases"}
            className={`nav-link text-black ${
              window.location.pathname === "/dashboard/my-purchases"
                ? "active text-white"
                : ""
            }`}
          >
            <svg className="bi pe-none me-2" width="16" height="16">
              <use xlinkHref="#table"></use>
            </svg>
            My Purchases
          </Link>
        </li>

        <li>
          <Link
            to={"/dashboard/about-us"}
            className={`nav-link text-black ${
              window.location.pathname === "/dashboard/about-us"
                ? "active text-white"
                : ""
            }`}
          >
            <svg className="bi pe-none me-2" width="16" height="16">
              <use xlinkHref="#people-circle"></use>
            </svg>
            About Us
          </Link>
        </li>
        <li>
          <Link
            to={"/dashboard/help-and-support"}
            className={`nav-link text-black ${
              window.location.pathname === "/dashboard/help-and-support"
                ? "active text-white"
                : ""
            }`}
          >
            <svg className="bi pe-none me-2" width="16" height="16">
              <use xlinkHref="#people-circle"></use>
            </svg>
            Help & Support
          </Link>
        </li>
      </ul>
      <hr />

      <div className="dropdown">
        <a
          href="#"
          className="text-decoration-none d-flex align-items-center link-body-emphasis imagelogout"
        >
          <img
            src="https://github.com/mdo.png"
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <p className="dropdown-btn nameCss" onClick={toggleDropdown}>
            {userInfo?.name?.split(" ")[0]}
          </p>
        </a>

        <div id="dropdown-content" className="dropdown-content">
          <a href="#">Profile</a>
          <a href="#">Settings</a>
          <hr />
          <a href="#" onClick={handleLogout}>
            {" "}
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
