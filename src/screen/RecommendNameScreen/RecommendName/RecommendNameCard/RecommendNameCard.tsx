import React from 'react';
import './RecommendNameCard.css';
import { toastMessage } from '~/utils/toastMessage';

const RecommendNameCard = ({ name }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(name);
    toastMessage('클립보드에 복사되었습니다.');
  };

  return (
    <button className="recommend-name-card" onClick={copyToClipboard}>
      {name}
    </button>
  );
};

export default RecommendNameCard;
