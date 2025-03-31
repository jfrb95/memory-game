import { toTitleCase } from "../utils"

export default function Card({ character }) {
  return (
    <button className='card'>
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