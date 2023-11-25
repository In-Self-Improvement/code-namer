import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getRecommendNameList } from '~/firebase/firebase';
import { SET_LOADING } from '~/redux/slice/loadingSlice';

const useRecommendNameList = (recommendID) => {
  const dispatch = useDispatch();
  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getRecommendNameList(recommendID),
    queryKey: ['recommendNameList', recommendID],
    enabled: !!recommendID,
  });

  const [recommendName, setRecommendName] = useState(null);

  useEffect(() => {
    if (data) {
      setRecommendName(data?.recommendName);
    }
    if (isLoading) {
      dispatch(SET_LOADING(true));
    }
    if (!isLoading) {
      dispatch(SET_LOADING(false));
    }
  }, [data]);

  return { recommendName };
};

export { useRecommendNameList };
