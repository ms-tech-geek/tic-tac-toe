import { useEffect, useMemo, useState, useCallback } from 'react';
import GameBoard from './components/GameBoard';
import Player from './components/Player';
import Log from './components/Log';
import GameOver from './components/GameOver';
import { WinningCombinations } from './helpers/WinningCombinations';
import moveSound from './assets/sounds/move.mp3';
import winSound from './assets/sounds/win.wav';
import resetSound from './assets/sounds/reset.ogg';

const initialPlayers = {
  X: 'Player 1',
  O: 'Player 2',
};

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const deriveActivePlayer = (gameTurns) => {
  const activePlayer =
    gameTurns.length > 0 && gameTurns[0].player === 'X' ? 'O' : 'X';
  return activePlayer;
};

const deriveGameBoard = (gameTurns) => {
  let gameBoard = [...initialGameBoard.map((innerArray) => [...innerArray])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
};

const deriveWinner = ({ gameBoard, players }) => {
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

const App = () => {
  const [players, setPlayers] = useState(initialPlayers);
  const [gameTurns, setGameTurns] = useState([]);
  const [scoreBoard, setScoreBoard] = useState({ X: 0, O: 0 });
  // const [winner, setWinner] = useState(null);
  const activePlayer = useMemo(
    () => deriveActivePlayer(gameTurns),
    [gameTurns]
  );
  const gameBoard = useMemo(() => deriveGameBoard(gameTurns), [gameTurns]);
  const winner = useMemo(
    () => deriveWinner({ gameBoard, players }),
    [gameBoard, players]
  );
  const hasDraw = gameTurns.length === 9 && !winner;

  const useSound = (sound) => {
    return useCallback(() => {
      new Audio(sound).play();
    }, [sound]);
  };

  const playMoveSound = useSound(moveSound);
  const playWinSound = useSound(winSound);
  const playResetSound = useSound(resetSound);

  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        {
          square: {
            row: rowIndex,
            col: colIndex,
          },
          player: currentPlayer,
        },
        ...prevTurns,
      ];

      return updatedTurns;
    });
    playMoveSound();
  };

  const handleRematch = () => {
    setGameTurns([]);
    playResetSound();
  };

  const handlePlayerNameChange = ({ symbol, playerName }) => {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: playerName,
      };
    });
  };

  const updateScoreBoard = (winner) => {
    const winnerSymbol = Object.keys(players).find(
      (key) => players[key] === winner
    );
    if (winnerSymbol) {
      setScoreBoard((prevScores) => ({
        ...prevScores,
        [winnerSymbol]: prevScores[winnerSymbol] + 1,
      }));
    }
  };

  useEffect(() => {
    if (winner) {
      updateScoreBoard(winner);
      playWinSound();
    }
  }, [winner, players]);

  return (
    <main>
      <div id="game-container">
        <div id="scoreboard">
          <span style={{ margin: '2rem', fontSize: '1.5rem' }}>
            {players.X} : {scoreBoard.X} Wins
          </span>
          <span style={{ margin: '2rem', fontSize: '1.5rem' }}>
            {players.O} : {scoreBoard.O} Wins
          </span>
        </div>
        <ol id="players" className="highlight-player">
          <Player
            initialName={initialPlayers.X}
            symbol="X"
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={initialPlayers.O}
            symbol="O"
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRematch={handleRematch} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
};

export default App;
