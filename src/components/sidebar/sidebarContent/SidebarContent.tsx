import React from 'react';
import './SidebarContent.css';
import { ReactComponent as variableIcon } from '~/assets/variable_icon.svg';
import { ReactComponent as functionIcon } from '~/assets/function_icon.svg';
interface SidebarContentProps {
  type?: string;
}

const SidebarContent = (props: SidebarContentProps) => {
  const { type } = props;
  const isFunction = type === 'function';
  const Icon = isFunction ? functionIcon : variableIcon;
  const title = '임시 고양이dlkfjdlfdkjfkldkfjdlkfjdlkfjldkfjldkj';

  const getRecommendName = () => {
    console.log('추천된 이름 로딩...');
  };

  const iconStyle = {
    width: isFunction ? '20px' : '10px',
  };

  return (
    <button className="sidebar_content_item_button" onClick={getRecommendName}>
      <Icon style={iconStyle} className="sidebar_content_item_icon" />
      <p className="sidebar_content_item_title">{title}</p>
    </button>
  );
};

export default SidebarContent;
