import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import loadingReducer from './slice/loadingSlice';
import recommendNameReducer from './slice/recommendNameSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  recommendName: recommendNameReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
