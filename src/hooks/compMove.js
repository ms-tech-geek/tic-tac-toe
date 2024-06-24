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

const checkImmediateWin = (board, player) => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === null) {
        board[i][j] = player;
        const winner = deriveWinner({
          gameBoard: board,
          players: { X: player, O: player },
        });
        board[i][j] = null;
        if (winner === player) {
          return { row: i, col: j };
        }
      }
    }
  }
  return null;
};

const getOptimalMoves = (board) => {
  const moves = getAvailableMoves(board);
  const priority = {
    center: [],
    corners: [],
    sides: [],
  };

  moves.forEach(({ row, col }) => {
    if (row === 1 && col === 1) {
      priority.center.push({ row, col });
    } else if ((row === 0 || row === 2) && (col === 0 || col === 2)) {
      priority.corners.push({ row, col });
    } else {
      priority.sides.push({ row, col });
    }
  });

  return [...priority.center, ...priority.corners, ...priority.sides];
};

export { getAvailableMoves, checkImmediateWin, getOptimalMoves };
