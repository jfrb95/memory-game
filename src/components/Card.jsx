import { toTitleCase } from "../utils"

export default function Card({ character, onClickFunc }) {
  return (
    <button 
      className='card'
      onClick={onClickFunc}
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