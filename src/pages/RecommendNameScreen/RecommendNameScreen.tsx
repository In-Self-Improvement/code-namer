import React, { useState } from 'react';
import RecommendName from '~/components/RecommendName/RecommendName';
import RecommendNameSetting from '~/components/RecommendNameSetting/RecommendNameSetting';
import './RecommendNameScreen.css';
import { useLocation } from 'react-router-dom';
import {
  updateRecommendName,
  updateRecommendNameOptions,
} from '~/firebase/firebase';
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
import { getName } from '~/api/openai';
import { parseAndRemoveNumberPrefixes } from '~/utils/stringParser';

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
        content?.recommendName,
        content?.options
      );
    return generateAdditionalVariableNameContent(
      content?.desc,
      content?.recommendName,
      content?.options
    );
  };

  const generateAdditionalName = async () => {
    const newContent = getContent();

    const openAIRecommendName = await getName(newContent);
    const result = parseAndRemoveNumberPrefixes(openAIRecommendName);
    updateRecommendNameData(result);
  };
  const onMoreClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    generateAdditionalName();
  };
  // const [content, setContent] = useState<ContentProps | null>(null);

  const onAddOption = () => {
    // setOptions((prevOptions) => [...prevOptions, 'new option']);
    updateRecommendNameOptions(recommendID, [
      ...content.options,
      '새로운 옵션',
    ]);
  };

  const onEdit = (index: number, value: string) => {
    const newOptions = [...content.options];
    newOptions.splice(index, 1, value);
    updateRecommendNameOptions(recommendID, newOptions);
  };

  const onDelete = (index: number) => {
    const newOptions = [...content.options];
    newOptions.splice(index, 1);
    updateRecommendNameOptions(recommendID, newOptions);
  };

  return (
    <div className="recommend-name-screen-container">
      <RecommendNameSetting
        type={content?.type}
        description={content?.desc}
        options={content?.options}
        onAddOption={onAddOption}
        onDelete={onDelete}
        onEdit={onEdit}
      />
      <RecommendName names={content?.recommendName} onMoreClick={onMoreClick} />
    </div>
  );
};

export default RecommendNameScreen;
