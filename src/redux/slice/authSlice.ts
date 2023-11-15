import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface IAuthState {
  isSignIn: boolean;
  email: null | string;
  userName: null | string;
  userID: null | string;
}

const initialState: IAuthState = {
  isSignIn: false,
  email: null,
  userName: null,
  userID: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      const { email, displayName, uid } = action.payload;
      state.isSignIn = true;
      state.email = email;
      state.userName = displayName;
      state.userID = uid;
    },
    REMOVE_ACTIVE_USER: (state) => {
      state.isSignIn = false;
      state.email = null;
      state.userName = null;
      state.userID = null;
    },
  },
});

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } = authSlice.actions;

export const selectIsSignIn = (state: RootState) => state.auth.isSignIn;
export const selectEmail = (state: RootState) => state.auth.email;
export const selectUserName = (state: RootState) => state.auth.userName;
export const selectUserID = (state: RootState) => state.auth.userID;

export default authSlice.reducer;
