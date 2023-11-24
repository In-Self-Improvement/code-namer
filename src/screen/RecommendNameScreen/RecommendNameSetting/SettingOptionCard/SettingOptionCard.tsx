import React, { useState } from 'react';
import './SettingOptionCard.css';

const SettingOptionCard = ({ name, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(name);

  const onSave = () => {
    onEdit(inputValue);
  };

  const onEditToggle = (event) => {
    event.preventDefault();
    setIsEditing(!isEditing);
    if (isEditing) {
      onSave();
    }
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="setting-option-card">
      {isEditing ? (
        <input type="text" value={inputValue} onChange={handleInputChange} />
      ) : (
        <span>{name}</span>
      )}
      <div className="button-container">
        <button onClick={onEditToggle}>{isEditing ? 'Save' : 'Edit'}</button>
        <button onClick={onDelete}>X</button>
      </div>
    </div>
  );
};

export default SettingOptionCard;
