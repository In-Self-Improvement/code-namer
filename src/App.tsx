import React, { useState } from 'react';
import './App.css';
import Router from './Router';
import Sidebar from './components/sidebar/Sidebar';
import Modal from 'react-modal';
import { ToastContainer } from 'react-toastify';
Modal.setAppElement('#root');

const App = () => {
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className={` ${isSidebarExpanded ? 'isSidebarExpanded' : ''}`}>
      <Sidebar onClick={toggleSidebar} />
      <Router className="main_content" />
      <ToastContainer autoClose={5000} />
    </div>
  );
};

export default App;
