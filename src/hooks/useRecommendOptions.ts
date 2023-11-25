import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getRecommendOptions } from '~/firebase/firebase';
import { SET_LOADING } from '~/redux/slice/loadingSlice';

const useRecommendOptions = (recommendID) => {
  const dispatch = useDispatch();
  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getRecommendOptions(recommendID),
    queryKey: ['options', recommendID],
    enabled: !!recommendID,
  });

  const [options, setOptions] = useState(null);

  useEffect(() => {
    if (data) {
      setOptions(data?.options);
    }
    if (isLoading) {
      dispatch(SET_LOADING(true));
    }
    if (!isLoading) {
      dispatch(SET_LOADING(false));
    }
  }, [data]);

  return { options };
};

export { useRecommendOptions };
