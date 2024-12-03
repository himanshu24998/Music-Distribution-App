import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App.jsx";
import SignUp from "./Components/SignUp.jsx";
import Login from "./Components/Login.jsx";
import Dashboard from "./Components/Dashboard.jsx";
import RefreshHandler from "./Components/RefreshHanlder.jsx";
import Page404 from "./Components/Page404.jsx";
import Home from "./Components/Home.jsx";
import Marketplace from "./Components/Marketplace.jsx";
import MyUploads from "./Components/MyUploads.jsx";
import AboutUs from "./Components/AboutUs.jsx";
import HelpAndSupport from "./Components/HelpAndSupport.jsx";
import Tickets from "./Components/Tickets.jsx";
import MyPurchases from "./Components/MyPurchases.jsx";
import TrackUpload from "./Components/TrackUpload.jsx";

const PrivateRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const AppRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute
              element={<Dashboard />}
              isAuthenticated={isAuthenticated}
            />
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="trackUpload" element={<TrackUpload />} />
          <Route path="my-uploads" element={<MyUploads />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="help-and-support" element={<HelpAndSupport />} />
          <Route path="view-tickets" element={<Tickets />} />
          <Route path="my-purchases" element={<MyPurchases />} />
        </Route>

        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
