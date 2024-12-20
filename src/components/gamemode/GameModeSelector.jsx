import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setGameMode } from '../../store/gameSlice';

const GameModeSelector = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSelectMode = (mode) => {
    console.log(`Game mode selected: ${mode}`);
    dispatch(setGameMode(mode)); // Dispatch action to update Redux state
    navigate(`/game/${mode}`); // Navigate to the game page
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
