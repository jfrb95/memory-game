import { toTitleCase } from "../utils"
import { useState } from "react";

export default function Card({ character, cardHandler, scoreHandler }) {

  //spent needs to reset when resetScore is triggered in ANY card, currently
  //  this is not the case

  function _onClickFunc() {
    if (cardHandler.spentCards.has(character.id)) {
      scoreHandler.resetScore();
      cardHandler.resetSpentCards();
    } else {
      scoreHandler.incrementScore();
      cardHandler.spendCard(character.id);
    }
  }

  return (
    <button 
      className='card'
      onClick={_onClickFunc}
    >
      <img
        className={'character-image'}
        src={character.sprites.other['official-artwork']['front_default']}
        alt={`${character.name} front view`}
      />
      <p className='card-name'>
        {toTitleCase(character.name)}
      </p>
    </button>
  )
}