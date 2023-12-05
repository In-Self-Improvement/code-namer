import React, { useState } from 'react';
import RecommendName from '~/screen/RecommendNameScreen/RecommendName/RecommendName';
import RecommendNameSetting from '~/screen/RecommendNameScreen/RecommendNameSetting/RecommendNameSetting';
import './RecommendNameScreen.css';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  additionalFunctionAssistantContent,
  additionalFunctionUserContent,
  additionalVariableAssistantContent,
  additionalVariableUserContent,
} from '~/utils/nameSuggestion';
import { getName } from '~/api/openai';
import { parseAndRemoveNumberPrefixes } from '~/utils/stringParser';
import {
  useUpdateRecommendName,
  useUpdateRecommendNameData,
  useUpdateRecommendNameOptions,
} from '~/hooks/useData';
import { useQuery } from '@tanstack/react-query';
import { getDesc, getType } from '~/firebase/firebase';
import { SET_LOADING } from '~/redux/slice/loadingSlice';
import { useRecommendOptions } from '~/hooks/useRecommendOptions';
import { useRecommendNameList } from '~/hooks/useRecommendNameList';
import { useType } from '~/hooks/useType';
import { useDesc } from '~/hooks/useDesc';

type ContentProps = {
  desc: string;
  recommendName: string[];
  type: string;
};

const RecommendNameScreen = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const recommendID = queryParams.get('recommendid');
  const recommendNameMutation = useUpdateRecommendName();
  const optionMutation = useUpdateRecommendNameOptions();
  const dispatch = useDispatch();

  const { options } = useRecommendOptions(recommendID);
  const { recommendName } = useRecommendNameList(recommendID);
  const { type } = useType(recommendID);
  const { desc } = useDesc(recommendID);

  const updateRecommendNameData = (recommendItem: string[]) => {
    recommendNameMutation.mutate({
      recommendID,
      recommendNameList: [...recommendName, ...recommendItem],
    });
    dispatch(SET_LOADING(false));
  };
  const getUserContent = () => {
    if (type === 'function')
      return additionalFunctionUserContent(desc, recommendName);
    return additionalVariableUserContent(desc, recommendName);
  };

  const getAssistantContent = () => {
    if (type === 'function') return additionalFunctionAssistantContent(options);
    return additionalVariableAssistantContent(options);
  };

  const generateAdditionalName = async () => {
    const newUserContent = getUserContent();
    const newAssistantContent = getAssistantContent();

    const openAIRecommendName = await getName(
      newUserContent,
      newAssistantContent
    );
    const result = parseAndRemoveNumberPrefixes(openAIRecommendName);
    updateRecommendNameData(result);
  };
  const onMoreClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(SET_LOADING(true));
    event.preventDefault();
    generateAdditionalName();
  };

  const onAddOption = () => {
    const newOptions = [...options, '새로운 옵션'];
    optionMutation.mutate({ recommendID, options: newOptions });
  };

  const onEdit = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions.splice(index, 1, value);
    optionMutation.mutate({ recommendID, options: newOptions });
  };

  const onDelete = (index: number) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    optionMutation.mutate({ recommendID, options: newOptions });
  };

  return (
    <div className="recommend-name-screen-container">
      <RecommendNameSetting
        type={type}
        description={desc}
        options={options}
        onAddOption={onAddOption}
        onDelete={onDelete}
        onEdit={onEdit}
      />
      <RecommendName names={recommendName} onMoreClick={onMoreClick} />
    </div>
  );
};

export default RecommendNameScreen;
