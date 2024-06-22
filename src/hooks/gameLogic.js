import { WinningCombinations } from '../helpers/WinningCombinations';

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export const deriveActivePlayer = (gameTurns) => {
  const activePlayer =
    gameTurns.length > 0 && gameTurns[0].player === 'X' ? 'O' : 'X';
  return activePlayer;
};

export const deriveGameBoard = (gameTurns) => {
  let gameBoard = [...initialGameBoard.map((innerArray) => [...innerArray])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
};

export const deriveWinner = ({ gameBoard, players }) => {
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

  return winner;
};
