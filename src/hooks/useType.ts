import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getType } from '~/firebase/firebase';
import { SET_LOADING } from '~/redux/slice/loadingSlice';

const useType = (recommendID) => {
  const dispatch = useDispatch();
  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getType(recommendID),
    queryKey: ['type', recommendID],
    enabled: !!recommendID,
  });

  const [type, setType] = useState(null);

  useEffect(() => {
    if (data) {
      setType(data?.type);
    }
    if (isLoading) {
      dispatch(SET_LOADING(true));
    }
    if (!isLoading) {
      dispatch(SET_LOADING(false));
    }
  }, [data]);

  return { type };
};

export { useType };
