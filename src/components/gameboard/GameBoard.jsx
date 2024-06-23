import React from 'react';
import GameCard from './GameCard';
import styles from './styles.module.scss';

const GameBoard = ({ onSelectSquare, board }) => {
  return (
    <ol className={styles.gameBoardContainer}>
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol className={styles.gameBoard}>
            {row.map((activePlayerSymbol, colIndex) => (
              <li key={colIndex}>
                <GameCard
                  onButtonClick={onSelectSquare}
                  row={rowIndex}
                  col={colIndex}
                  symbol={activePlayerSymbol}
                />
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};

export default GameBoard;
