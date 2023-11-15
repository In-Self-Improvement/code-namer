import React, { useState } from 'react';
import RecommendName from '~/components/RecommendName/RecommendName';
import RecommendNameSetting from '~/components/RecommendNameSetting/RecommendNameSetting';
import './RecommendNameScreen.css';
import { useLocation } from 'react-router-dom';
import { getRecommendNameDataForUser } from '~/firebase/firebase';
import {
  selectIsSignIn,
  selectUserID,
  selectEmail,
  selectUserName,
} from '~/redux/slice/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { SAVE_RECOMMEND_NAME } from '~/redux/slice/recommendNameSlice';
import {
  selectAllRecommendNames,
  selectRecommendNameByRecommendId,
} from '~/redux/slice/recommendNameSlice';

type ContentProps = {
  desc: string;
  recommendName: string[];
  type: string;
};

const RecommendNameScreen = () => {
  const isSignin = useSelector(selectIsSignIn);
  const userEmail = useSelector(selectEmail);
  const dispatch = useDispatch();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const recommendID = queryParams.get('recommendid');
  const info = useSelector(selectAllRecommendNames);
  const content = useSelector(selectRecommendNameByRecommendId(recommendID));

  const onMoreClick = () => {
    //TODO 추가 데이터 요청 로직 구현
  };
  const [options, setOptions] = useState(['option1', 'option2', 'option3']);
  // const [content, setContent] = useState<ContentProps | null>(null);

  const addOption = () => {
    setOptions((prevOptions) => [...prevOptions, 'new option']);
  };

  const onDelete = (index: number) => {
    setOptions((prevOptions) => [
      ...prevOptions.slice(0, index),
      ...prevOptions.slice(index + 1),
    ]);
  };

  return (
    <div className="recommend-name-screen-container">
      <RecommendNameSetting
        type={content?.type}
        description={content?.desc}
        options={options}
        addOption={addOption}
        onDelete={onDelete}
      />
      <RecommendName names={content?.recommendName} onMoreClick={onMoreClick} />
    </div>
  );
};

export default RecommendNameScreen;
