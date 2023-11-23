import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query';
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
      queryClient.invalidateQueries({ queryKey: ['recommendNameData'] });
    },
    onError: (error) => {},
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
    }) => {
      return updateRecommendNameOptions(recommendID, options);
    },
    onMutate: async ({
      recommendID,
      options,
    }: {
      recommendID: string;
      options: string[];
    }) => {
      const newData = queryClient.setQueryData(['options', recommendID], {
        options,
      });

      return newData;
    },
    onError: (error) => {},
  });
};

export const useUpdateRecommendName = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      recommendID,
      recommendNameList,
    }: {
      recommendID: string;
      recommendNameList: string[];
    }) => {
      return updateRecommendName(recommendID, recommendNameList);
    },
    onMutate: async ({
      recommendID,
      recommendNameList,
    }: {
      recommendID: string;
      recommendNameList: string[];
    }) => {
      const newData = queryClient.setQueryData(
        ['recommendNameList', recommendID],
        {
          recommendName: recommendNameList,
        }
      );
      return { recommendName: newData };
    },
    onError: (error) => {},
  });
};
