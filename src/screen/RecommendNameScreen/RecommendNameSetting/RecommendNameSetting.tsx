import React from 'react';
import './RecommendNameSetting.css';
import SettingOptionCard from './SettingOptionCard/SettingOptionCard';
import { ReactComponent as variableIcon } from '~/assets/variable_icon.svg';
import { ReactComponent as functionIcon } from '~/assets/function_icon.svg';
import OptionSettingAddButton from './OptionSettingAddButton/OptionSettingAddButton';

const RecommendNameSetting = ({
  type,
  description,
  options,
  onDelete,
  onEdit,
  onAddOption,
}) => {
  const isFunction = type === 'function';
  const Icon = isFunction ? functionIcon : variableIcon;
  const iconStyle = {
    width: isFunction ? '20px' : '10px',
  };

  return (
    <div className="recommend-name-setting">
      <div className="recommend-name-setting-title">
        <Icon style={iconStyle} className="sidebar_content_item_icon" />
        <p>{description}</p>
      </div>
      {options?.map((option, index) => (
        <SettingOptionCard
          key={`${option}${index}`}
          name={option}
          onDelete={onDelete.bind(this, index)}
          onEdit={onEdit.bind(this, index)}
        />
      ))}
      <OptionSettingAddButton addOption={onAddOption} />
    </div>
  );
};

export default RecommendNameSetting;
