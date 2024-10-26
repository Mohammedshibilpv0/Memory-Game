import React from 'react';
import { Modal } from 'antd';

interface GameOverModalProps {
  isVisible: boolean;
  matchedPairs: number;
  totalPairs: number;
  timeRemaining: number;
  hasTimer: boolean;
  onRestart: () => void;
  onClose: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  isVisible,
  matchedPairs,
  totalPairs,
  timeRemaining,
  hasTimer,
  onRestart,
  onClose
}) => {
  const isWinner = matchedPairs === totalPairs;

  return (
    <Modal
      title={isWinner ? "Congratulations! 🎉" : "Game Over!"}
      open={isVisible}
      onOk={onRestart}
      onCancel={onClose}
      okText="Play Again"
      cancelText="Close"
    >
      {isWinner ? (
        <p>You've matched all pairs {hasTimer && `with ${timeRemaining} seconds remaining!`}</p>
      ) : (
        <p>Time's up! You matched {matchedPairs} out of {totalPairs} pairs.</p>
      )}
    </Modal>
  );
};