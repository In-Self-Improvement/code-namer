import React, { useState } from 'react';
import './Sidebar.css';
import SidebarHeader from './sidebarHeader/SidebarHeader';
import SidebarContent from './sidebarContent/SidebarContent';
import NavigationButton from './navigationButton/NavigationButton';
import UserStatus from '~/components/UserStatus/UserStatus';

interface SidebarProps {
  onClick?: () => void;
}

const Sidebar = ({ onClick }: SidebarProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    onClick();
  };

  return (
    <div className={`sidebar_container  ${isSidebarOpen ? 'show' : ''} `}>
      <SidebarHeader className="isSidebarFolded" onClick={toggleSidebar} />
      <div className={`sidebar_content ${isSidebarOpen ? 'show' : ''}`}>
        <SidebarHeader className="isSidebarExpanded" onClick={toggleSidebar} />
        <NavigationButton />
        <SidebarContent type="function" />
        <SidebarContent type="function" />
        <SidebarContent />
        <SidebarContent />
        <UserStatus />
      </div>
    </div>
  );
};

export default Sidebar;
