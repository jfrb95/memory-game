import { useState } from "react";

export default function useCardHandler() {
  const [spentCards, setSpentCards] = useState(new Set());

  function spendCard(id) {
    setSpentCards(prevState => {
      const newState = new Set(prevState);
      newState.add(id);
      return newState;
    })
  }

  function resetSpentCards() {
    setSpentCards(prevState => new Set());
  }

  return {
    spentCards,
    spendCard,
    resetSpentCards
  }
}