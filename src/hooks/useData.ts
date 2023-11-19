import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  updateRecommendName,
  updateRecommendNameOptions,
} from '~/firebase/firebase';

export const useUpdateRecommendNameData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      recommendID,
      recommendData,
    }: {
      recommendID: string;
      recommendData: any;
    }) => updateRecommendName(recommendID, recommendData),
    onSuccess: () => {
      console.log('onSucess');

      queryClient.invalidateQueries({ queryKey: ['recommendNameData'] });
    },
    onError: (error) => {
      console.log('mutation error', error);
    },
  });
};

export const useUpdateRecommendNameOptions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      recommendID,
      options,
    }: {
      recommendID: string;
      options: string[];
    }) => updateRecommendNameOptions(recommendID, options),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recommendNameData'] });
    },
    onError: (error) => {
      console.log('mutation error', error);
    },
  });
};
