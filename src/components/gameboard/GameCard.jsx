import React from 'react';
import styles from './styles.module.scss';

const DEBUG = false;

const GameCard = ({ onButtonClick, row, col, symbol }) => {
  DEBUG && console.log('Rendering GameCard component');
  DEBUG && console.log('onButtonClick function:', onButtonClick);
  DEBUG && console.log('row:', row);
  DEBUG && console.log('col:', col);
  DEBUG && console.log('symbol:', symbol);

  return (
    <button
      onClick={() => {
        DEBUG && console.log('Button clicked');
        onButtonClick(row, col);
      }}
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
};

export default GameCard;
