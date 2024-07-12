import { useEffect, useMemo, useState, useCallback } from 'react';
import {
  deriveActivePlayer,
  deriveWinner,
  deriveGameBoard,
} from './hooks/gameLogic';
import { checkImmediateWin, getOptimalMoves } from './hooks/compMove';
import Header from './components/header/Header';
import ScoreBoard from './components/scoreboard/ScoreBoard';
import GameBoard from './components/gameboard/GameBoard';
import GameOver from './components/gameover/GameOver';
import moveSound from '/assets/sounds/move.mp3';
import winSound from '/assets/sounds/win.aac';
import drawSound from '/assets/sounds/draw.aac';
import resetSound from '/assets/sounds/reset.ogg';
import PlayersBoard from './components/players/PlayersBoard';
import GameModeSelector from './components/gamemode/GameModeSelector';
import styles from './styles.module.scss';

const DEBUG = false;

const initialPlayers = {
  X: 'Player 1',
  O: 'Player 2',
};

const App = () => {
  const [gameMode, setGameMode] = useState(null);
  const [players, setPlayers] = useState(initialPlayers);
  const [gameTurns, setGameTurns] = useState([]);
  const [scoreBoard, setScoreBoard] = useState({ X: 0, O: 0 });
  const [isComputerTurn, setIsComputerTurn] = useState(false);

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

  const handleSelectMode = (mode) => {
    console.log(`Game mode selected: ${mode}`);
    setGameMode(() => mode);
    if (mode === 'pvc') {
      setPlayers({
        X: 'Player 1',
        O: 'Computer',
      });
    }
    setGameTurns([]); // Reset the game turns when mode is selected
    setIsComputerTurn(false); // Reset computer turn when mode is selected
  };

  const handleSelectSquare = (rowIndex, colIndex) => {
    if (
      gameBoard[rowIndex][colIndex] ||
      winner ||
      (isComputerTurn && gameMode === 'pvc')
    )
      return;

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

      if (gameMode === 'pvc' && currentPlayer === 'X') {
        setIsComputerTurn(true);
      }
      DEBUG && console.log('Updated turns:', updatedTurns);
      return updatedTurns;
    });
  };

  const handleRematch = () => {
    DEBUG && console.log('handleRematch called');
    playResetSound();
    setGameTurns([]);
    setIsComputerTurn(false);
    setGameMode(null);
  };

  const updatePlayerName = (prevPlayers, symbol, playerName) => {
    DEBUG && console.log('prevPlayers:', prevPlayers);
    DEBUG && console.log('symbol:', symbol);
    DEBUG && console.log('playerName:', playerName);
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

  useEffect(() => {
    if (isComputerTurn && gameMode === 'pvc') {
      makeComputerMove();
    }
  }, [isComputerTurn, gameMode]);

  const makeComputerMove = () => {
    setTimeout(() => {
      const board = deriveGameBoard(gameTurns);

      // Check for immediate win for computer
      let move = checkImmediateWin(board, 'O');
      if (move) {
        setGameTurns((prevTurns) => [
          {
            square: { row: move.row, col: move.col },
            player: 'O',
          },
          ...prevTurns,
        ]);
        setIsComputerTurn(false);
        return;
      }

      // Check for immediate win for opponent
      move = checkImmediateWin(board, 'X');
      if (move) {
        setGameTurns((prevTurns) => [
          {
            square: { row: move.row, col: move.col },
            player: 'O',
          },
          ...prevTurns,
        ]);
        setIsComputerTurn(false);
        return;
      }

      // Get optimal moves
      const optimalMoves = getOptimalMoves(board);
      if (optimalMoves.length > 0) {
        const { row, col } = optimalMoves[0];
        setGameTurns((prevTurns) => [
          {
            square: { row, col },
            player: 'O',
          },
          ...prevTurns,
        ]);
      }

      setIsComputerTurn(false);
      playMoveSound();
    }, 500);
  };

  return (
    <>
      <Header />
      <main>
        {gameMode === null && (
          <GameModeSelector onSelectMode={handleSelectMode} />
        )}
        {gameMode && (
          <>
            <ScoreBoard players={players} scoreBoard={scoreBoard} />
            <PlayersBoard
              initialPlayers={players}
              activePlayer={activePlayer}
              handlePlayerNameChange={handlePlayerNameChange}
            />
            <div className={styles.gameContainer}>
              {(winner || hasDraw) && (
                <GameOver winner={winner} onRematch={handleRematch} />
              )}

              <GameBoard
                onSelectSquare={handleSelectSquare}
                board={gameBoard}
              />
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default App;
