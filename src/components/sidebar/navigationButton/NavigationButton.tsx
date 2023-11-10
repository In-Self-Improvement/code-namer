import React from 'react';
import './NavigationButton.css';

const NavigationButton = () => {
  const onClickButton = () => {
    console.log('clicked button 새로운 이름 추천');
  };
  return (
    <div className="navigation_button_wrapper">
      <button className="navigation_button" onClick={onClickButton}>
        + 새로운 이름 추천
      </button>
    </div>
  );
};

export default NavigationButton;
