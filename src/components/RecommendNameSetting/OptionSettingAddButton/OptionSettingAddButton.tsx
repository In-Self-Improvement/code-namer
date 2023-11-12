import React from 'react';
import './OptionSettingAddButton.css';

const OptionSettingAddButton = ({ addOption }) => (
  <button className="option-setting-add-button" onClick={addOption}>
    Add Option
  </button>
);

export default OptionSettingAddButton;
