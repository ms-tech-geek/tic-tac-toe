import { useNavigate } from 'react-router-dom';

const GameModeSelector = () => {
  const navigate = useNavigate();

  const handleSelectMode = (mode) => {
    console.log(`Game mode selected: ${mode}`);
    navigate(`/game/${mode}`);
  };

  return (
    <div className="gameModeContainerWrapper">
      <div className="gameModeContainer">
        <div className="gameModeContentWrapper">
          <h2 className="gameModeHeader">Game Mode</h2>
          <div className="gameModeButtonsContainer">
            <button
              onClick={() => handleSelectMode('pvp')}
              className="gameModeButtons"
            >
              Player vs Player
            </button>

            <button
              onClick={() => handleSelectMode('pvc')}
              className="gameModeButtons"
            >
              Player vs Computer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameModeSelector;
