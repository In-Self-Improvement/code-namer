import React from 'react';
import './SidebarContent.css';

const SidebarContent = () => {
  const imgurl =
    'https://img.freepik.com/free-photo/the-red-or-white-cat-i-on-white-studio_155003-13189.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1699142400&semt=sph';

  return (
    <div className="sidebar-content-item">
      <img src={imgurl} className="sidebar-content-item-img" />
      <p>임시 고양이</p>
    </div>
  );
};

export default SidebarContent;
