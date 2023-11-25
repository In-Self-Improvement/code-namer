import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getDesc } from '~/firebase/firebase';
import { SET_LOADING } from '~/redux/slice/loadingSlice';

const useDesc = (recommendID) => {
  const dispatch = useDispatch();
  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getDesc(recommendID),
    queryKey: ['desc', recommendID],
    enabled: !!recommendID,
  });

  const [desc, setDesc] = useState(null);

  useEffect(() => {
    if (data) {
      setDesc(data?.desc);
    }
    if (isLoading) {
      dispatch(SET_LOADING(true));
    }
    if (!isLoading) {
      dispatch(SET_LOADING(false));
    }
  }, [data]);

  return { desc };
};

export { useDesc };
