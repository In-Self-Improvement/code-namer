import React, { useState } from 'react';
import RecommendName from '~/components/RecommendName/RecommendName';
import RecommendNameSetting from '~/components/RecommendNameSetting/RecommendNameSetting';
import './RecommendNameScreen.css';
import { useLocation } from 'react-router-dom';
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
import {
  useUpdateRecommendNameData,
  useUpdateRecommendNameOptions,
} from '~/hooks/useData';
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
  const recommendNameMutation = useUpdateRecommendNameData();
  const optionMutation = useUpdateRecommendNameOptions();
  const updateRecommendNameData = (recommendItem: string[]) => {
    const recommendData = {
      lastUpdated: new Date(),
      recommendName: recommendItem,
    };
    recommendNameMutation.mutate({ recommendID, recommendData });
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

  const onAddOption = () => {
    const newOptions = [...content.options, '새로운 옵션'];
    optionMutation.mutate({ recommendID, options: newOptions });
  };

  const onEdit = (index: number, value: string) => {
    const newOptions = [...content.options];
    newOptions.splice(index, 1, value);
    optionMutation.mutate({ recommendID, options: newOptions });
  };

  const onDelete = (index: number) => {
    const newOptions = [...content.options];
    newOptions.splice(index, 1);
    optionMutation.mutate({ recommendID, options: newOptions });
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
