import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './courseSlice';

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
  },
});