import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ListItem } from '@mui/material';

interface ILoadingState {
  type: string;
  desc: string;
  recommendName: string[];
  recommendId: string;
}

const initialState: ILoadingState[] = [
  {
    type: 'function',
    desc: '짝수인지 아닌지 확인하는 기능',
    recommendName: ['isEven', 'isOdd'],
    recommendId: 'test_recommendId',
  },
];

const recommendNameSlice = createSlice({
  name: 'recommendName',
  initialState,
  reducers: {
    SAVE_RECOMMEND_NAME: (state, action) => {
      state.length = 0;
      action.payload.map((item: ILoadingState) => {
        const { type, desc, recommendName, recommendId } = item;
        state.push({ type, desc, recommendName, recommendId });
      });
    },
  },
});

export const { SAVE_RECOMMEND_NAME } = recommendNameSlice.actions;

export const selectAllRecommendNames = (state: RootState) =>
  state.recommendName;

export const selectRecommendNameByRecommendId =
  (recommendId: string) => (state: RootState) =>
    state.recommendName.find((item) => item.recommendId === recommendId);

export default recommendNameSlice.reducer;
