import React from 'react';
import styles from './styles.module.scss';

const GameCard = ({ onButtonClick, row, col, symbol }) => (
  <button
    onClick={() => onButtonClick(row, col)}
    disabled={symbol}
    style={
      symbol && {
        cursor: 'not-allowed',
      }
    }
    className={styles.gameCard}
  >
    {symbol}
  </button>
);

export default GameCard;
