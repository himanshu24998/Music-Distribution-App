import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const RefreshHandler = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const data = localStorage.getItem("user-info");
    const token = JSON.parse(data)?.token;
    if (token) {
      setIsAuthenticated(true);
      if (
        location.pathname === "/" ||
        location.pathname === "/login" ||
        location.pathname === "/register"
      ) {
        navigate("/dashboard/home");
      }
    }
  }, [location, navigate, setIsAuthenticated]);

  return <div></div>;
};

export default RefreshHandler;
