import React from 'react';
import './RecommendNameCard.css';

const RecommendNameCard = ({ name }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(name);
  };

  return (
    <button className="recommend-name-card" onClick={copyToClipboard}>
      {name}
    </button>
  );
};

export default RecommendNameCard;
