import { useState } from "react";

export default function useScoreHandler() {
  const [scores, setScores] = useState({current: 0, high: 0});

  function incrementScore() {
    setScores(prevState => {
      const increment = prevState.current + 1;
      return {
        current: increment,
        high: increment > prevState.high ? increment : prevState.high
      }
    }
    );
  }

  function resetScore() {
    setScores(prevState => ({...prevState, current: 0}))
  }

  return {
    scores,
    incrementScore,
    resetScore
  }
}