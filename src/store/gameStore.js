import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './gameSlice';

export const gameStore = configureStore({
  reducer: {
    game: gameReducer,
  },
});
