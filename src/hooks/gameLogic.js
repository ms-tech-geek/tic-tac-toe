import { WinningCombinations } from '../helpers/WinningCombinations';

const DEBUG = false;

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export const deriveActivePlayer = (gameTurns) => {
  const activePlayer =
    gameTurns.length > 0 && gameTurns[0].player === 'X' ? 'O' : 'X';
  DEBUG && console.log('deriveActivePlayer: activePlayer:', activePlayer);
  return activePlayer;
};

export const deriveGameBoard = (gameTurns) => {
  let gameBoard = [...initialGameBoard.map((innerArray) => [...innerArray])];

  DEBUG && console.log('deriveGameBoard: gameBoard before:', gameBoard);

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  DEBUG && console.log('deriveGameBoard: gameBoard after:', gameBoard);

  return gameBoard;
};

export const deriveWinner = ({ gameBoard, players }) => {
  DEBUG && console.log('deriveWinner: gameBoard:', gameBoard);
  DEBUG && console.log('deriveWinner: players:', players);

  let winner;

  for (const combination of WinningCombinations) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].col];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    )
      winner = players[firstSquareSymbol];
  }

  DEBUG && console.log('deriveWinner: winner:', winner);

  return winner;
};
