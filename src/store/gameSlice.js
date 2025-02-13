import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gameMode: null,
  boardSize: 3,
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
    setBoardSize: (state, action) => {
      state.boardSize = action.payload;
    },
  },
});

export const { setGameMode, setBoardSize } = gameSlice.actions;

export default gameSlice.reducer;
