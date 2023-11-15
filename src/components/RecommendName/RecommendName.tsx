import React from 'react';
import './RecommendName.css';
import RecommendNameCard from './RecommendNameCard/RecommendNameCard';
import MoreButton from './MoreButton/MoreButton';

const RecommendName = ({ names, onMoreClick }) => (
  <div className="recommended-name-screen">
    <div className="name-cards">
      {names?.map((name, index) => (
        <RecommendNameCard key={`${name}${index}`} name={name} />
      ))}
    </div>
    <MoreButton onClick={onMoreClick} />
  </div>
);

export default RecommendName;
