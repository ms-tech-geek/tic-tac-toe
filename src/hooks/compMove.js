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
  const boardSize = board.length;
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (board[i][j] === null) {
        board[i][j] = player;
        const winner = deriveWinner({
          gameBoard: board,
          players: { X: player, O: player },
          boardSize,
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
  const boardSize = board.length;
  const moves = getAvailableMoves(board);
  const priority = {
    center: [],
    corners: [],
    sides: [],
  };

  moves.forEach(({ row, col }) => {
    // For odd board sizes, the center is the middle cell.
    if (
      boardSize % 2 === 1 &&
      row === Math.floor(boardSize / 2) &&
      col === Math.floor(boardSize / 2)
    ) {
      priority.center.push({ row, col });
    } else if (
      (row === 0 || row === boardSize - 1) &&
      (col === 0 || col === boardSize - 1)
    ) {
      priority.corners.push({ row, col });
    } else {
      priority.sides.push({ row, col });
    }
  });

  return [...priority.center, ...priority.corners, ...priority.sides];
};

export { getAvailableMoves, checkImmediateWin, getOptimalMoves };
