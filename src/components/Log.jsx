const LogItem = ({ turn }) => {
  <li>
    {turn.player} selected {turn.square.row},{turn.square.col}
  </li>;
};

const Log = ({ turns }) => {
  return (
    <ol id="log">
      {turns.map((turn) => (
        <LogItem key={`${turn.square.row}-${turn.square.col}`} turn={turn} />
      ))}
    </ol>
  );
};

export default Log;
