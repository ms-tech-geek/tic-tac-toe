const GameModeSelector = ({ onSelectMode }) => {
  const buttonStyle = `
    font-caprasimo
    text-xl 
    bg-[#4b4b4b] 
    hover:bg-[#fcd256] 
    text-[#fcd256] 
    hover:text-[#3f3b00]
    border-2 border-[#fcd256] 
    p-2 
    px-4 
    rounded-[4px] 
    cursor-pointer 
    transition-all 
    duration-200 
    my-2 
    flex-grow 
    transform 
    hover:scale-105
  `;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-[30rem] bg-stone-700 p-8 rounded-[6px] bg-gradient-to-b from-[#383624] to-[#282617] shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col items-center">
          <h2 className="text-5xl mb-4 font-caprasimo">Game Mode</h2>
          <div className="flex flex-col">
            <button onClick={() => onSelectMode('pvp')} className={buttonStyle}>
              Player vs Player
            </button>

            <button onClick={() => onSelectMode('pvc')} className={buttonStyle}>
              Player vs Computer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameModeSelector;
