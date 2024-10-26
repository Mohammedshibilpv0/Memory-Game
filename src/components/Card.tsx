
import React from 'react';

interface CardProps {
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

 const Card: React.FC<CardProps> = ({
  value,
  isFlipped,
  isMatched,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        aspect-square w-full h-full rounded-lg cursor-pointer
        transition-all duration-300 transform-gpu
        ${isFlipped || isMatched ? 'rotate-y-180' : ''}
        ${isMatched ? 'opacity-50' : ''}
      `}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      <div className={`
        absolute w-full h-full
        ${isFlipped || isMatched ? 'hidden' : 'bg-blue-500'}
        rounded-lg
      `} />
      <div className={`
        absolute w-full h-full flex items-center justify-center
        ${isFlipped || isMatched ? 'visible' : 'hidden'}
        bg-white rounded-lg text-4xl
      `}>
        {value}
      </div>
    </div>
  );
};

export default Card