const GameCard = ({ onButtonClick, row, col, symbol }) => (
  <button
    onClick={() => onButtonClick(row, col)}
    disabled={symbol}
    style={
      symbol && {
        cursor: 'not-allowed',
      }
    }
  >
    {symbol}
  </button>
);

const GameBoard = ({ onSelectSquare, board }) => {
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
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
