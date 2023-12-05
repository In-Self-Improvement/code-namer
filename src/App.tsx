import React, { useState } from 'react';
import './App.css';
import Router from './Router';
import Sidebar from './screen/sidebar/Sidebar';
import Modal from 'react-modal';
import { ToastContainer } from 'react-toastify';
import ReactGA from 'react-ga';

ReactGA.initialize('G-KEHWJRKQMJ');
ReactGA.pageview(window.location.pathname + window.location.search);
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
