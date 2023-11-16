import React, { useState } from 'react';
import RecommendName from '~/components/RecommendName/RecommendName';
import RecommendNameSetting from '~/components/RecommendNameSetting/RecommendNameSetting';
import './RecommendNameScreen.css';
import { useLocation } from 'react-router-dom';
import { updateRecommendName } from '~/firebase/firebase';
import { selectIsSignIn, selectEmail } from '~/redux/slice/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAllRecommendNames,
  selectRecommendNameByRecommendId,
} from '~/redux/slice/recommendNameSlice';
import {
  generateAdditionalFunctionNameContent,
  generateAdditionalVariableNameContent,
} from '~/utils/nameSuggestion';
import { parseByNewLine } from '~/utils/stringParser';
import { getName } from '~/api/openai';
import { removeNumberPrefixes } from '~/utils/removeNumber';

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

  const updateRecommendNameData = (recommendItem: string[]) => {
    const recommendData = {
      lastUpdated: new Date(),
      recommendName: recommendItem,
    };
    updateRecommendName(recommendID, recommendData);
  };
  const getContent = () => {
    if (content.type === 'function')
      return generateAdditionalFunctionNameContent(
        content?.desc,
        content?.recommendName
      );
    return generateAdditionalVariableNameContent(
      content?.desc,
      content?.recommendName
    );
  };
  const generateAdditionalName = async () => {
    const newContent = getContent();

    const openAIRecommendName = await getName(newContent);
    const removeNumberRecommendName = removeNumberPrefixes(openAIRecommendName);
    const result = parseByNewLine(removeNumberRecommendName);
    updateRecommendNameData(result);
  };
  const onMoreClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    generateAdditionalName();
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
