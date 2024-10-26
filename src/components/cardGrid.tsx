import React from 'react';
import { Timer } from './Timer';
import { Hint } from './hint';
import { GameOverModal } from './GameOverModal';
import { useGameLogic } from './gameLogic';
import Card from './Card';

interface CardGridProps {
  gridSize?: number;
  timer?: boolean;
  timeLimit?: number;
  cancelModal:() => void;
  showHint:boolean
}

const CardGrid: React.FC<CardGridProps> = ({
  gridSize = 7,
  timer = false,
  timeLimit = 1,
  cancelModal,
  showHint
}) => {
  const {
    gameState,
    timeRemaining,
    hintsRemaining,
    isHintActive,
    initializeGame,
    handleCardClick,
    handleHint
  } = useGameLogic({ gridSize, timeLimit, timer });

  const getGridStyles = () => {
    const baseSize = Math.min(window.innerHeight * 0.8, window.innerWidth * 0.8);
    const minGap = 8;
    return {
      gap: `${minGap}px`,
      maxWidth: `${baseSize}px`,
      maxHeight: `${baseSize}px`,
      width: '100%',
      height: '100%'
    };
  };

  const gridStyles = getGridStyles();

  return (
    <div className="w-screen h-screen flex items-center justify-center p-4">
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex gap-4 items-center">
        {timer && <Timer timeRemaining={timeRemaining} />}
        {showHint&& (
          <Hint
          hintsRemaining={hintsRemaining}
          isHintActive={isHintActive}
          isChecking={gameState.isChecking}
          onHint={handleHint}
        />
        )}
      </div>

      <div
        className="grid bg-gray-100 p-4 rounded-xl shadow-lg mx-auto"
        style={{
          ...gridStyles,
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`
        }}
      >
        {gameState.cards.map((card) => (
          <Card
            key={card.id}
            value={card.value}
            isFlipped={card.isFlipped}
            isMatched={card.isMatched}
            onClick={() => handleCardClick(card)}
          />
        ))}
      </div>

      <GameOverModal
        isVisible={gameState.showGameOver}
        matchedPairs={gameState.matchedPairs}
        totalPairs={Math.floor((gridSize * gridSize) / 2)}
        timeRemaining={timeRemaining}
        hasTimer={timer}
        onRestart={initializeGame}
        onClose={cancelModal}
      />
    </div>
  );
};

export default CardGrid;