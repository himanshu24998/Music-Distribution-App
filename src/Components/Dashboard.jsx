import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

import Footer from "./Footer";

const Dashboard = () => {
  return (
    <div className="Dashboard">
      <Sidebar />
      <div className="container">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
