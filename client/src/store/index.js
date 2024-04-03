import { configureStore } from '@reduxjs/toolkit';
import teamReducer from './slices/teamSlice';

export const store = configureStore({
  reducer: {
    team: teamReducer,
  },
});
