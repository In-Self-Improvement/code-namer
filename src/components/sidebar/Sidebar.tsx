import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import SidebarHeader from './sidebarHeader/SidebarHeader';
import SidebarContent from './sidebarContent/SidebarContent';
import NavigationButton from './navigationButton/NavigationButton';
import UserStatus from '~/components/UserStatus/UserStatus';
import { getRecommendNameDataForUser } from '~/firebase/firebase';
import {
  selectIsSignIn,
  selectUserID,
  selectEmail,
  selectUserName,
} from '~/redux/slice/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { SAVE_RECOMMEND_NAME } from '~/redux/slice/recommendNameSlice';
import { useQuery } from '@tanstack/react-query';
import { SET_LOADING } from '~/redux/slice/loadingSlice';

interface SidebarProps {
  onClick?: () => void;
}

const Sidebar = ({ onClick }: SidebarProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [content, setContent] = useState([]);
  const isSignin = useSelector(selectIsSignIn);
  const userEmail = useSelector(selectEmail);
  const dispatch = useDispatch();

  const { data, isLoading, error } = useQuery({
    queryKey: ['recommendNameData'],
    queryFn: () => getRecommendNameDataForUser(userEmail),
    enabled: !!userEmail,
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    onClick();
  };

  useEffect(() => {
    dispatch(SET_LOADING(true));
    if (isSignin && data) {
      setContent(data);
      dispatch(SAVE_RECOMMEND_NAME(data));
      dispatch(SET_LOADING(false));
    }
  }, [isSignin, data]);

  return (
    <div className={`sidebar_container  ${isSidebarOpen ? 'show' : ''} `}>
      <SidebarHeader className="isSidebarFolded" onClick={toggleSidebar} />
      <div className={`sidebar_content ${isSidebarOpen ? 'show' : ''}`}>
        <SidebarHeader className="isSidebarExpanded" onClick={toggleSidebar} />
        <NavigationButton />
        {content?.map((item, index) => (
          <SidebarContent
            key={`${item}${index}`}
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
