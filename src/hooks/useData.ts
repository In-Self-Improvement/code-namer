import { useQuery, useMutation, useQueryClient } from "react-query";
import * as api from "~/api/api";
import * as openai from "~/api/openai";

export const useGetData = (db) => {
  return useQuery(["data", db], () => api.getData(db), {
    staleTime: 1000 * 60 * 5,
  });
};

// 데이터를 추가하는 커스텀 훅
export const usePostData = (db) => {
  const queryClient = useQueryClient();

  return useMutation((data) => api.postData(db, data), {
    onSuccess: () => {
      // 성공 시 캐시 무효화
      queryClient.invalidateQueries(["data", db]);
    },
  });
};

// 데이터를 업데이트하는 커스텀 훅
export const useUpdateData = (db) => {
  const queryClient = useQueryClient();

  return useMutation((data) => api.updateData(db, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(["data", db]);
    },
  });
};

// 인덱스로 데이터를 가져오는 커스텀 훅
export const useGetDataByIndex = (db, index) => {
  return useQuery(
    ["dataByIndex", db, index],
    () => api.getDataByIndex(db, index),
    {
      // 옵션
    }
  );
};

export const useGetName = (content) => {
  return useQuery(["name"], () => openai.getName(content), {
    staleTime: 1000 * 60 * 5,
  });
};
