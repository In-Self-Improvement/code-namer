import React, { useState } from 'react';
import './App.css';
import Router from './Router';
import Sidebar from './components/sidebar/Sidebar';

const App = () => {
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setSidebarExpanded(!isSidebarExpanded);
    console.log('딸깍', isSidebarExpanded);
  };

  return (
    <div className={` ${isSidebarExpanded ? 'isSidebarExpanded' : ''}`}>
      <Sidebar toggleSidebar={toggleSidebar} />
      <Router className="main_content" />
    </div>
  );
};

export default App;
