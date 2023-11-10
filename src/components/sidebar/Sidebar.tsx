import React, { useState } from 'react';
import './Sidebar.css';
import SidebarHeader from './sidebarHeader/SidebarHeader';
import SidebarContent from './sidebarContent/SidebarContent';
import NavigationButton from './navigationButton/NavigationButton';
import UserStatus from '~/components/UserStatus/UserStatus';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`sidebar_container  ${isSidebarOpen ? 'show' : ''}`}>
      <SidebarHeader onClick={toggleSidebar} />
      <div className={`sidebar_content ${isSidebarOpen ? 'show' : ''}`}>
        <SidebarHeader onClick={toggleSidebar} />
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
