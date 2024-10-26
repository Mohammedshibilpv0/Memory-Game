import { useState, useEffect } from 'react';
import { GameState, Card } from './Timer';

interface UseGameLogicProps {
  gridSize: number;
  timeLimit: number;
  timer: boolean;
}

export const useGameLogic = ({ gridSize, timeLimit, timer }: UseGameLogicProps) => {
  const allEmojis = [
    "🍕", "🍔", "🍟", "🍣", "🍩", "🍰", "🍎", "🍌", "🍉", "🥐", 
    "🥑", "🥕", "🍇", "🍒", "🍪", "🍫", "🍬", "🍮", "🥧", "🥞",
    "🌮", "🌯", "🥨", "🥯", "🥖", "🧀", "🥝", "🍍", "🥥", "🍅",
    "🥪", "🌭", "🍗", "🥓", "🍖", "🍙", "🍜", "🍝", "🥘", "🧂",
    "🍤", "🥡", "🥠", "🍥", "🥮", "🍡", "🍧", "🍨", "🍦", "🥧"
  ];

  const totalPairs = Math.floor((gridSize * gridSize) / 2);
  
  const [gameState, setGameState] = useState<GameState>({
    cards: [],
    flippedCards: [],
    isChecking: false,
    matchedPairs: 0,
    gameStarted: false,
    showGameOver: false
  });

  const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  const [hintsRemaining, setHintsRemaining] = useState(3);
  const [isHintActive, setIsHintActive] = useState(false);

  useEffect(() => {
    initializeGame();
  }, [gridSize]);

  useEffect(() => {
    if (!timer || !gameState.gameStarted || timeRemaining <= 0) return;

    const timerInterval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          setGameState(prev => ({ ...prev, showGameOver: true }));
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timer, gameState.gameStarted, timeRemaining]);

  const initializeGame = () => {
    const selectedEmojis = allEmojis.slice(0, totalPairs);
    const shuffledEmojis = [...selectedEmojis, ...selectedEmojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        value: emoji,
        isFlipped: false,
        isMatched: false
      }));

    setGameState({
      cards: shuffledEmojis,
      flippedCards: [],
      isChecking: false,
      matchedPairs: 0,
      gameStarted: false,
      showGameOver: false
    });
    setTimeRemaining(timeLimit);
    setHintsRemaining(3);
    setIsHintActive(false);
  };
  const handleCardClick = (clickedCard: Card) => {
    if (
      gameState.isChecking ||
      clickedCard.isMatched ||
      clickedCard.isFlipped ||
      gameState.flippedCards.includes(clickedCard.id)
    ) {
      return;
    }
  
    
    if (!gameState.gameStarted) {
      setGameState(prev => ({ ...prev, gameStarted: true }));
    }
  
    const newFlippedCards = [...gameState.flippedCards, clickedCard.id];
    const updatedCards = gameState.cards.map(card =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );
  
    // Immediately update the state to show both cards as flipped
    setGameState(prev => ({
      ...prev,
      cards: updatedCards,
      flippedCards: newFlippedCards
    }));
  
    if (newFlippedCards.length === 2) {
      setGameState(prev => ({ ...prev, isChecking: true }));
  
      // Delay to check for a match
      setTimeout(() => {
        const [firstCardId, secondCardId] = newFlippedCards;
        const firstCard = updatedCards.find(card => card.id === firstCardId);
        const secondCard = updatedCards.find(card => card.id === secondCardId);
  
        if (firstCard && secondCard && firstCard.value === secondCard.value) {
          // Match found
          const matchedCards = updatedCards.map(card =>
            card.id === firstCardId || card.id === secondCardId
              ? { ...card, isMatched: true }
              : card
          );
  
          const newMatchedPairs = gameState.matchedPairs + 1;
          setGameState(prev => ({
            ...prev,
            cards: matchedCards,
            flippedCards: [],
            isChecking: false,
            matchedPairs: newMatchedPairs,
            showGameOver: newMatchedPairs === totalPairs
          }));
        } else {
          // No match
          const resetCards = updatedCards.map(card =>
            newFlippedCards.includes(card.id)
              ? { ...card, isFlipped: false }
              : card
          );
  
          setGameState(prev => ({
            ...prev,
            cards: resetCards,
            flippedCards: [],
            isChecking: false
          }));
        }
      }, 500); // Delay allows both cards to be shown briefly
    }
  };
  

  const handleHint = () => {
    if (hintsRemaining <= 0 || isHintActive || gameState.isChecking) return;

    setHintsRemaining(prev => prev - 1);
    setIsHintActive(true);

    // Find an unmatched pair
    const unmatchedCards = gameState.cards.filter(card => !card.isMatched);
    if (unmatchedCards.length >= 2) {
      const targetValue = unmatchedCards[0].value;
      const hintPair = gameState.cards
        .filter(card => card.value === targetValue && !card.isMatched)
        .map(card => card.id);

      const hintCards = gameState.cards.map(card => ({
        ...card,
        isFlipped: hintPair.includes(card.id)
      }));

      setGameState(prev => ({ ...prev, cards: hintCards }));

      setTimeout(() => {
        const resetCards = gameState.cards.map(card => ({
          ...card,
          isFlipped: card.isMatched
        }));
        setGameState(prev => ({ ...prev, cards: resetCards }));
        setIsHintActive(false);
      }, 2000);
    }
  };

  return {
    gameState,
    timeRemaining,
    hintsRemaining,
    isHintActive,
    initializeGame,
    handleCardClick,
    handleHint
  };
};