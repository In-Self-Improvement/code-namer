import React, { useState } from 'react';
import './Sidebar.css';
import SidebarHeader from './sidebarHeader/SidebarHeader';
import SidebarContent from './sidebarContent/SidebarContent';
import NavigationButton from './navigationButton/NavigationButton';
import UserStatus from '~/components/UserStatus/UserStatus';
import { getRecommendNameDataForUser } from '~/firebase/firebase';

interface SidebarProps {
  onClick?: () => void;
}

const Sidebar = ({ onClick }: SidebarProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [content, setContent] = useState([]);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    onClick();
  };
  React.useEffect(() => {
    // getRecommendNameDataForUser('test@gmail.com').then((result) => {
    //   setContent(result);
    // });
  }, []);

  // result 를 사용해서 sidebarContent 를 map돌려 주세요.

  return (
    <div className={`sidebar_container  ${isSidebarOpen ? 'show' : ''} `}>
      <SidebarHeader className="isSidebarFolded" onClick={toggleSidebar} />
      <div className={`sidebar_content ${isSidebarOpen ? 'show' : ''}`}>
        <SidebarHeader className="isSidebarExpanded" onClick={toggleSidebar} />
        <NavigationButton />
        {content?.map((item) => (
          <SidebarContent
            type={item.type}
            title={item.desc}
            recommendId={item.recommendId}
          />
        ))}
        <UserStatus />
      </div>
    </div>
  );
};

export default Sidebar;
