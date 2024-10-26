export interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  cards: Card[];
  flippedCards: number[];
  isChecking: boolean;
  matchedPairs: number;
  gameStarted: boolean;
  showGameOver: boolean;
}

import React from 'react';

interface TimerProps {
  timeRemaining: number;
}

export const Timer: React.FC<TimerProps> = ({ timeRemaining }) => {
  return (
    <div className="bg-white px-4 py-2 rounded-lg shadow-md">
      <span className="text-xl font-bold">
        Time: {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
      </span>
    </div>
  );
};


