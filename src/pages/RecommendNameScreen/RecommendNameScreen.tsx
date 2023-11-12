import React, { useState } from 'react';
import RecommendName from '~/components/RecommendName/RecommendName';
import RecommendNameSetting from '~/components/RecommendNameSetting/RecommendNameSetting';
import './RecommendNameScreen.css';
const RecommendNameScreen = () => {
  const type = 'function';
  const description = 'desc';
  const names = ['name1', 'name2', 'name3'];
  const onMoreClick = () => {
    console.log('onMoreClick');
  };
  const [options, setOptions] = useState(['option1', 'option2', 'option3']);

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
        type={type}
        description={description}
        options={options}
        addOption={addOption}
        onDelete={onDelete}
      />
      <RecommendName names={names} onMoreClick={onMoreClick} />
    </div>
  );
};

export default RecommendNameScreen;
