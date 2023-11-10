import React, { useState } from 'react';
import './App.css';
import Router from './Router';
import Sidebar from './components/sidebar/Sidebar';

const App = () => {
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className={` ${isSidebarExpanded ? 'isSidebarExpanded' : ''}`}>
      <Sidebar onClick={toggleSidebar} />
      <Router className="main_content" />
    </div>
  );
};

export default App;
