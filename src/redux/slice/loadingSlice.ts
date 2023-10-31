import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ILoadingState {
  isLoading: boolean;
}

const initialState: ILoadingState = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    SET_LOADING: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { SET_LOADING } = loadingSlice.actions;

export const selectIsLoading = (state: RootState) => state.loading.isLoading;

export default loadingSlice.reducer;
