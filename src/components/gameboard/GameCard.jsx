import { useState } from 'react';
import styles from './styles.module.scss';

const DEBUG = false;

const GameCard = ({ onButtonClick, row, col, symbol }) => {
  const [selected, setSelected] = useState(false);

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
        setSelected(() => true);
        setTimeout(() => {
          setSelected(() => false);
        }, 500);
      }}
      disabled={symbol}
      style={
        symbol && {
          cursor: 'not-allowed',
        }
      }
      className={`${styles.gameCard} ${selected ? styles.marked : undefined}`}
    >
      {symbol}
    </button>
  );
};

export default GameCard;
