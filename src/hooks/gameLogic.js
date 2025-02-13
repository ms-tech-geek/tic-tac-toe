const DEBUG = false;

export const createInitialBoard = (boardSize) => {
  return Array.from({ length: boardSize }, () => Array(boardSize).fill(null));
};

export const deriveActivePlayer = (gameTurns) => {
  const activePlayer =
    gameTurns.length > 0 && gameTurns[0].player === 'X' ? 'O' : 'X';
  DEBUG && console.log('deriveActivePlayer: activePlayer:', activePlayer);
  return activePlayer;
};

export const deriveGameBoard = (gameTurns, boardSize) => {
  const gameBoard = createInitialBoard(boardSize);

  DEBUG && console.log('deriveGameBoard: gameBoard before:', gameBoard);

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  DEBUG && console.log('deriveGameBoard: gameBoard after:', gameBoard);

  return gameBoard;
};

export const deriveWinner = ({ gameBoard, players, boardSize }) => {
  // Check rows
  for (let i = 0; i < boardSize; i++) {
    const first = gameBoard[i][0];
    if (first && gameBoard[i].every((cell) => cell === first)) {
      return players[first];
    }
  }

  // Check columns
  for (let j = 0; j < boardSize; j++) {
    const first = gameBoard[0][j];
    if (first) {
      let win = true;
      for (let i = 1; i < boardSize; i++) {
        if (gameBoard[i][j] !== first) {
          win = false;
          break;
        }
      }
      if (win) return players[first];
    }
  }

  // Check main diagonal
  let first = gameBoard[0][0];
  if (first) {
    let win = true;
    for (let i = 1; i < boardSize; i++) {
      if (gameBoard[i][i] !== first) {
        win = false;
        break;
      }
    }
    if (win) return players[first];
  }

  // Check anti-diagonal
  first = gameBoard[0][boardSize - 1];
  if (first) {
    let win = true;
    for (let i = 1; i < boardSize; i++) {
      if (gameBoard[i][boardSize - 1 - i] !== first) {
        win = false;
        break;
      }
    }
    if (win) return players[first];
  }

  return null;
};
