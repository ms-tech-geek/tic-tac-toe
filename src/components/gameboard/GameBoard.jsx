import GameCard from './GameCard';
import styles from './styles.module.scss';

const DEBUG = false;

const GameBoard = ({ onSelectSquare, board }) => {
  DEBUG && console.log('Rendering GameBoard component');
  DEBUG && console.log('onSelectSquare function:', onSelectSquare);
  DEBUG && console.log('board:', board);

  return (
    <ol className={styles.gameBoardContainer}>
      {board.map((row, rowIndex) => {
        DEBUG && console.log('Processing row:', row, 'at index:', rowIndex);
        return (
          <li key={rowIndex}>
            <ol className={styles.gameBoard}>
              {row.map((activePlayerSymbol, colIndex) => {
                DEBUG &&
                  console.log(
                    'Processing symbol:',
                    activePlayerSymbol,
                    'at row:',
                    rowIndex,
                    'column:',
                    colIndex
                  );
                return (
                  <li key={colIndex}>
                    <GameCard
                      onButtonClick={onSelectSquare}
                      row={rowIndex}
                      col={colIndex}
                      symbol={activePlayerSymbol}
                    />
                  </li>
                );
              })}
            </ol>
          </li>
        );
      })}
    </ol>
  );
};

export default GameBoard;
