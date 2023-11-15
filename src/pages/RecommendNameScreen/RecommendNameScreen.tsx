import React, { useState } from 'react';
import RecommendName from '~/components/RecommendName/RecommendName';
import RecommendNameSetting from '~/components/RecommendNameSetting/RecommendNameSetting';
import './RecommendNameScreen.css';
import { useLocation } from 'react-router-dom';
import { getRecommendNameDataForUser } from '~/firebase/firebase';

type ContentProps = {
  desc: string;
  recommendName: string[];
  type: string;
};

const RecommendNameScreen = () => {
  const type = 'function';
  const description = 'desc';
  const names = ['name1', 'name2', 'name3'];
  const onMoreClick = () => {
    //TODO 추가 데이터 요청 로직 구현
  };
  const [options, setOptions] = useState(['option1', 'option2', 'option3']);
  const [content, setContent] = useState<ContentProps | null>(null);

  const addOption = () => {
    setOptions((prevOptions) => [...prevOptions, 'new option']);
  };

  const onDelete = (index: number) => {
    setOptions((prevOptions) => [
      ...prevOptions.slice(0, index),
      ...prevOptions.slice(index + 1),
    ]);
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const recommendID = queryParams.get('recommendid');

  React.useEffect(() => {
    getRecommendNameDataForUser('test@gmail.com').then((result) => {
      const res = result.filter((item) => item.recommendId === recommendID);
      setContent(res[0]);
    });
  }, []);

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
