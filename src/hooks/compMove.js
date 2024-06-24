import { deriveWinner } from './gameLogic';

const getAvailableMoves = (board) => {
  const moves = [];
  board.forEach((row, rowIndex) =>
    row.forEach((cell, colIndex) => {
      if (cell === null) {
        moves.push({ row: rowIndex, col: colIndex });
      }
    })
  );
  return moves;
};

export const minimax = (board, depth, isMaximizing, player, opponent) => {
  const winner = deriveWinner({
    gameBoard: board,
    players: { X: player, O: opponent },
  });

  if (winner) {
    return winner === player ? 10 - depth : depth - 10;
  }

  if (board.flat().every((cell) => cell !== null)) {
    return 0; // Draw
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    getAvailableMoves(board).forEach(({ row, col }) => {
      board[row][col] = player;
      const score = minimax(board, depth + 1, false, player, opponent);
      board[row][col] = null;
      bestScore = Math.max(score, bestScore);
    });
    return bestScore;
  } else {
    let bestScore = Infinity;
    getAvailableMoves(board).forEach(({ row, col }) => {
      board[row][col] = opponent;
      const score = minimax(board, depth + 1, true, player, opponent);
      board[row][col] = null;
      bestScore = Math.min(score, bestScore);
    });
    return bestScore;
  }
};

export const findBestMove = (board, player, opponent) => {
  let bestScore = -Infinity;
  let bestMove = null;
  getAvailableMoves(board).forEach(({ row, col }) => {
    board[row][col] = player;
    const score = minimax(board, 0, false, player, opponent);
    board[row][col] = null;
    if (score > bestScore) {
      bestScore = score;
      bestMove = { row, col };
    }
  });
  return bestMove;
};
