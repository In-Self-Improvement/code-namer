import React from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import './Header.css';

const Header = () => {
  const openSidebar = () => {
    console.log('open sidebar');
  };
  return (
    <div className="header_container">
      <button className="header_toggle" onClick={openSidebar}>
        <MenuIcon />
      </button>
      <h1 className="header_title">Code Namer</h1>
    </div>
  );
};

export default Header;
