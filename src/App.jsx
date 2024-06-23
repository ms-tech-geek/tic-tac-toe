import { useEffect, useMemo, useState, useCallback } from 'react';
import {
  deriveActivePlayer,
  deriveWinner,
  deriveGameBoard,
} from './hooks/gameLogic';
import ScoreBoard from './components/scoreboard/ScoreBoard';
import GameBoard from './components/gameboard/GameBoard';
import Log from './components/Log';
import GameOver from './components/gameover/GameOver';
import moveSound from './assets/sounds/move.mp3';
import winSound from './assets/sounds/win.aac';
import drawSound from './assets/sounds/draw.aac';
import resetSound from './assets/sounds/reset.ogg';
import PlayersBoard from './components/players/PlayersBoard';

const initialPlayers = {
  X: 'Player 1',
  O: 'Player 2',
};

const App = () => {
  const [players, setPlayers] = useState(initialPlayers);
  const [gameTurns, setGameTurns] = useState([]);
  const [scoreBoard, setScoreBoard] = useState({ X: 0, O: 0 });
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

  const usePlaySound = (sound) => {
    return useCallback(() => {
      new Audio(sound).play();
    }, [sound]);
  };

  const playMoveSound = usePlaySound(moveSound);
  const playWinSound = usePlaySound(winSound);
  const playDrawSound = usePlaySound(drawSound);
  const playResetSound = usePlaySound(resetSound);

  if (hasDraw) {
    playDrawSound();
  }

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

  const updatePlayerName = (prevPlayers, symbol, playerName) => {
    return {
      ...prevPlayers,
      [symbol]: playerName,
    };
  };

  const handlePlayerNameChange = ({ symbol, playerName }) => {
    setPlayers((prevPlayers) =>
      updatePlayerName(prevPlayers, symbol, playerName)
    );
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
      <ScoreBoard players={players} scoreBoard={scoreBoard} />
      <PlayersBoard
        initialPlayers={initialPlayers}
        activePlayer={activePlayer}
        handlePlayerNameChange={handlePlayerNameChange}
      />
      <div id="game-container">
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
