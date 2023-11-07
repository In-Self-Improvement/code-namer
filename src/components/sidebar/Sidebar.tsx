import React, { useState } from "react";
import "./Sidebar.css";
import SidebarHeader from "./sidebarHeader/SidebarHeader";
import SidebarContent from "./sidebarContent/SidebarContent";
import NavigationButton from "./navigationButton/NavigationButton";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="sidebar-container">
      <SidebarHeader onClick={toggleSidebar} />
      <div className={`sidebar-content ${isSidebarOpen ? "show" : ""}`}>
        <SidebarHeader onClick={toggleSidebar} />
        <NavigationButton />
        <SidebarContent />
        <SidebarContent />
        <SidebarContent />
        <SidebarContent />
      </div>
    </div>
  );
};

export default Sidebar;
