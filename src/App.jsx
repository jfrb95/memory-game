import { useState, useEffect } from 'react'
import Card from './components/Card';
import ScoreTracker from './components/ScoreTracker';
import useScoreHandler from './hooks/useScoreHandler';
import useCardHandler from './hooks/useCardHandler';
import './styles/App.css'

function App() {
  
  const rootUrl = 'https://pokeapi.co/api/v2/pokemon/';

  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  const pokedexNumbers = [1, 6, 8, 11, 15, 17, 19, 25, 28, 34, 39, 41];

  //better to encapsulate all API-spefici logic in here, so that the rest
  //  of the program can be used without being changed
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
              />
            )
          })}

        </div>
      </main>
    </>
  )
}

export default App
