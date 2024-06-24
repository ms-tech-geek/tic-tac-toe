import { useEffect, useMemo, useState, useCallback } from 'react';
import {
  deriveActivePlayer,
  deriveWinner,
  deriveGameBoard,
} from './hooks/gameLogic';
import ScoreBoard from './components/scoreboard/ScoreBoard';
import GameBoard from './components/gameboard/GameBoard';
import GameLog from './components/gamelog/GameLog';
import GameOver from './components/gameover/GameOver';
import moveSound from '/assets/sounds/move.mp3';
import winSound from '/assets/sounds/win.aac';
import drawSound from '/assets/sounds/draw.aac';
import resetSound from '/assets/sounds/reset.ogg';
import PlayersBoard from './components/players/PlayersBoard';

const DEBUG = false;

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

  DEBUG && console.log('activePlayer:', activePlayer);
  DEBUG && console.log('gameBoard:', gameBoard);
  DEBUG && console.log('winner:', winner);
  DEBUG && console.log('hasDraw:', hasDraw);

  if (hasDraw) {
    DEBUG && console.log('Playing draw sound');
    playDrawSound();
  }

  const handleSelectSquare = (rowIndex, colIndex) => {
    DEBUG && console.log('handleSelectSquare called');
    DEBUG && console.log('rowIndex:', rowIndex);
    DEBUG && console.log('colIndex:', colIndex);
    playMoveSound();
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

      DEBUG && console.log('Updated turns:', updatedTurns);
      return updatedTurns;
    });
  };

  const handleRematch = () => {
    DEBUG && console.log('handleRematch called');
    playResetSound();
    setGameTurns([]);
  };

  const updatePlayerName = (prevPlayers, symbol, playerName) => {
    return {
      ...prevPlayers,
      [symbol]: playerName,
    };
  };

  const handlePlayerNameChange = ({ symbol, playerName }) => {
    DEBUG && console.log('handlePlayerNameChange called');
    DEBUG && console.log('symbol:', symbol);
    DEBUG && console.log('playerName:', playerName);
    setPlayers((prevPlayers) =>
      updatePlayerName(prevPlayers, symbol, playerName)
    );
  };

  const updateScoreBoard = (winner) => {
    DEBUG && console.log('updateScoreBoard called');
    DEBUG && console.log('winner:', winner);
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
    DEBUG && console.log('useEffect called');
    DEBUG && console.log('winner:', winner);
    if (winner) {
      DEBUG && console.log('Playing win sound');
      playWinSound();
      updateScoreBoard(winner);
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
      <GameLog turns={gameTurns} />
    </main>
  );
};

export default App;
