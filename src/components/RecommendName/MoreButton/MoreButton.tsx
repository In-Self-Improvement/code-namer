import React from 'react';
import './MoreButton.css';

const MoreButton = ({ onClick }) => {
  return (
    <button className="more-button" onClick={onClick}>
      Load More
    </button>
  );
};

export default MoreButton;
