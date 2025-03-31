import { useState, useEffect } from 'react'
import Card from './components/Card';
import ScoreTracker from './components/ScoreTracker';
import useScoreHandler from './hooks/useScoreHandler';
import useCardHandler from './hooks/useCardHandler';
import './styles/App.css'
import { shuffle } from './utils';

function App() {
  
  const rootUrl = 'https://pokeapi.co/api/v2/pokemon/';

  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  //when this gets shuffled, the cards don't re-order.
  //  POSSIBLE SOLUTION: use a state for this.
  //  ADDITIONAL: integrate this solution into the pokemon list state,
  //    while reducing the pokemonList to contain only information used
  //    by the app
  let pokedexNumbers = [1, 6, 8, 11, 15, 17, 19, 25, 28, 34, 39, 41];

  //better to encapsulate all API-specific logic in here, so that the rest
  //  of the program can be used without being changed. 
  //DO this and separate it all out into separate module. Only thing here 
  //  should be the return section and any other necessary bits such as
  //  hook initialization
  useEffect(() => {

    (async function fetchPokemon() {
      const pokePromises = pokedexNumbers.map(number => {
        const request = new Request(rootUrl + number);
        return fetch(request)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Failed to fetch Pokemon #${number}`);
            }
            return response.json();;
          })
          .catch(error => {
            console.error(`Failed to fetch Pokemon #${number}`, error);
            return null;
          });
      })

      const pokeResults = await Promise.all(pokePromises);
      const pokemon = pokeResults.reduce((acc, curr) => {
        acc.push(curr);
        return acc;
      }, []);
      setPokemonList(pokemon);
      setLoading(false);

    })();

  }, []);
  
  function logPokemonList() {
    console.log(pokemonList);
  }

  const _scoreHandler = useScoreHandler();
  const _cardHandler = useCardHandler();

  function logPokedexNumbers() {
    console.log(pokedexNumbers);
  }

  return (
    <>
      <header>
        <div className="title">
          <h1>Pokemon Memory Game</h1>
          <p>Click the images to gain points, but don't click the same one twice!</p>
        </div>
        <ScoreTracker 
          scoreHandler={_scoreHandler}
        />
      </header>
      <main>
        <button onClick={logPokemonList} /*className='hidden'*/>Log Pokemon List</button>
        
        <div id="cards-wrapper">
          {pokemonList.map(pokemon => {
            return (
              <Card
                key={`${pokemon.name} card`}
                character={pokemon}
                cardHandler={_cardHandler}
                scoreHandler={_scoreHandler}
                funcs={[() => pokedexNumbers = shuffle(pokedexNumbers), logPokedexNumbers]}
              />
            )
          })}

        </div>
      </main>
    </>
  )
}

export default App
