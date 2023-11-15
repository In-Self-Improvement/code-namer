import React from 'react';
import './SidebarContent.css';
import { ReactComponent as variableIcon } from '~/assets/variable_icon.svg';
import { ReactComponent as functionIcon } from '~/assets/function_icon.svg';
interface SidebarContentProps {
  type?: string;
  title?: string;
  recommendId?: string;
}

const SidebarContent = (props: SidebarContentProps) => {
  const { type, title, recommendId } = props;
  const isFunction = type === 'function';
  const Icon = isFunction ? functionIcon : variableIcon;

  const iconStyle = {
    width: isFunction ? '20px' : '10px',
  };

  return (
    <a
      className="sidebar_content_item_button"
      href={`/result?recommendid=${recommendId}`}
    >
      <Icon style={iconStyle} className="sidebar_content_item_icon" />
      <p className="sidebar_content_item_title">{title}</p>
    </a>
  );
};

export default SidebarContent;
