import { toTitleCase } from "../utils"
import { useState } from "react";

export default function Card({ character, cardHandler, scoreHandler, funcs=[] }) {

  function _onClickFunc() {
    if (cardHandler.spentCards.has(character.id)) {
      scoreHandler.resetScore();
      cardHandler.resetSpentCards();
    } else {
      scoreHandler.incrementScore();
      cardHandler.spendCard(character.id);
    }
    funcs.forEach(func => func());
  }

  return (
    <button 
      className='card'
      onClick={_onClickFunc}
    >
      <img
        className={'character-image'}
        src={character.img}
        alt={`${character.name} front view`}
      />
      <p className='card-name'>
        {toTitleCase(character.name)}
      </p>
    </button>
  );
}