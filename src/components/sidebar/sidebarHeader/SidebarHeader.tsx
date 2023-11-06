import React from "react";

import MenuIcon from "@mui/icons-material/Menu";
import "./SidebarHeader.css";

const SidebarHeader = ({ onClick }) => {
  return (
    <div className="sidebar-container">
      <button className="sidebar-toggle" onClick={onClick}>
        <MenuIcon />
      </button>
      <h1 className="sidebar-title">Code Namer</h1>
    </div>
  );
};

export default SidebarHeader;
