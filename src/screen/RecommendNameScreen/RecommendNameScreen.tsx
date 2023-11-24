import React, { useState } from 'react';
import RecommendName from '~/screen/RecommendNameScreen/RecommendName/RecommendName';
import RecommendNameSetting from '~/screen/RecommendNameScreen/RecommendNameSetting/RecommendNameSetting';
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
  useUpdateRecommendName,
  useUpdateRecommendNameData,
  useUpdateRecommendNameOptions,
} from '~/hooks/useData';
import { useQuery } from '@tanstack/react-query';
import {
  getDesc,
  getRecommendNameList,
  getRecommendOptions,
  getType,
  updateRecommendNameOptions,
} from '~/firebase/firebase';
import { SET_LOADING } from '~/redux/slice/loadingSlice';
type ContentProps = {
  desc: string;
  recommendName: string[];
  type: string;
};

const RecommendNameScreen = () => {
  const [options, setOptions] = useState<string[]>([]);
  const [recommendName, setRecommendName] = useState<string[]>([]);
  const [type, setType] = useState<string>();
  const [desc, setDesc] = useState<string>();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const recommendID = queryParams.get('recommendid');
  const recommendNameMutation = useUpdateRecommendName();
  const optionMutation = useUpdateRecommendNameOptions();
  const dispatch = useDispatch();
  const updateRecommendNameData = (recommendItem: string[]) => {
    recommendNameMutation.mutate({
      recommendID,
      recommendNameList: [...recommendName, ...recommendItem],
    });
    dispatch(SET_LOADING(false));
  };
  const getContent = () => {
    if (type === 'function')
      return generateAdditionalFunctionNameContent(
        desc,
        recommendName,
        options
      );
    return generateAdditionalVariableNameContent(desc, recommendName, options);
  };

  const generateAdditionalName = async () => {
    const newContent = getContent();

    const openAIRecommendName = await getName(newContent);
    const result = parseAndRemoveNumberPrefixes(openAIRecommendName);
    updateRecommendNameData(result);
  };
  const onMoreClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(SET_LOADING(true));
    event.preventDefault();
    generateAdditionalName();
  };
  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getRecommendOptions(recommendID),
    queryKey: ['options', recommendID],
    enabled: !!recommendID,
  });
  const { data: recommendNameList } = useQuery({
    queryFn: () => getRecommendNameList(recommendID),
    queryKey: ['recommendNameList', recommendID],
    enabled: !!recommendID,
  });
  const { data: typeInfo } = useQuery({
    queryFn: () => getType(recommendID),
    queryKey: ['type', recommendID],
    enabled: !!recommendID,
  });

  const { data: descInfo } = useQuery({
    queryFn: () => getDesc(recommendID),
    queryKey: ['desc', recommendID],
    enabled: !!recommendID,
  });

  React.useEffect(() => {
    if (data) {
      setOptions(data?.options);
    }
  }, [data]);

  React.useEffect(() => {
    if (recommendNameList) {
      setRecommendName(recommendNameList?.recommendName);
    }
  }, [recommendNameList]);

  React.useEffect(() => {
    if (typeInfo) {
      setType(typeInfo?.type);
    }
  }, [typeInfo]);

  React.useEffect(() => {
    if (descInfo) {
      setDesc(descInfo?.desc);
    }
  }, [descInfo]);

  const onAddOption = () => {
    //options {}에서 [] 배열로 변경
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

  if (isLoading) return <div>로딩중</div>;
  if (isError) return <div>에러{error.toString()}</div>;
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
