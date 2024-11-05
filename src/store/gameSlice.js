import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gameMode: null,
  players: {
    X: 'Player 1',
    O: 'Player 2',
  },
  gameTurns: [],
  scoreBoard: { X: 0, O: 0 },
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameMode: (state, action) => {
      state.gameMode = action.payload;
    },
    // Add more reducers here
  },
});

export const { setGameMode } = gameSlice.actions;

export default gameSlice.reducer;