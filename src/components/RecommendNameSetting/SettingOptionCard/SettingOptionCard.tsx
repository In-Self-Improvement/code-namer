import React, { useState } from 'react';
import './SettingOptionCard.css';

const SettingOptionCard = ({ name, onDelete }) => {
  const [isOn, setIsOn] = useState(true);
  const [optionName, setOptionName] = useState(name);

  const toggle = () => {
    setIsOn(!isOn);
  };

  const handleNameChange = (event) => {
    setOptionName(event.target.value);
  };

  return (
    <div className="setting-option-card">
      <span className={isOn ? '' : 'off'}>{name}</span>
      <div className="button-container">
        <button onClick={toggle}>{isOn ? 'ON' : 'OFF'}</button>
        <button onClick={onDelete}>X</button>
      </div>
    </div>
  );
};

export default SettingOptionCard;
