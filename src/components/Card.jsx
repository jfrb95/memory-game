export default function Card({ character }) {
  return (
    <button className='card'>
      <img
        className={'character-image'}
        src={character.sprites.other['official-artwork']['front_default']}
        alt={`${character.name} front view`}
      />
      <p className='card-name'>
        {character.name}
      </p>
    </button>
  )
}