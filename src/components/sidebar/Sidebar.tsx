import React, { useState } from 'react';
import './Sidebar.css';
import SidebarHeader from './sidebarHeader/SidebarHeader';
import SidebarContent from './sidebarContent/SidebarContent';
import NavigationButton from './navigationButton/NavigationButton';
import UserStatus from '~/components/UserStatus/UserStatus';

interface SidebarProps {
  toggleSidebar?: () => void;
}

const Sidebar = ({ toggleSidebar }: SidebarProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar2 = () => {
    setIsSidebarOpen(!isSidebarOpen);
    toggleSidebar();
  };

  return (
    <div className={`sidebar_container  ${isSidebarOpen ? 'show' : ''} `}>
      <SidebarHeader className="isSidebarFolded" onClick={toggleSidebar2} />
      <div className={`sidebar_content ${isSidebarOpen ? 'show' : ''}`}>
        <SidebarHeader className="isSidebarExpanded" onClick={toggleSidebar2} />
        <NavigationButton />
        <SidebarContent />
        <SidebarContent />
        <SidebarContent />
        <SidebarContent />
        <UserStatus />
      </div>
    </div>
  );
};

export default Sidebar;
