import { useState, useEffect } from 'react'
import { toTitleCase } from './utils';
import Card from './components/Card';
import './styles/App.css'

function App() {
  
  const rootUrl = 'https://pokeapi.co/api/v2/pokemon/';

  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  const pokedexNumbers = [1, 6, 8, 11, 15, 17, 19, 25, 28, 34, 39, 41];

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

    })();

  }, []);
  
  function logPokemonList() {
    console.log(pokemonList);
  }

  function cardClick() {
    //if first time card is clicked:
    //  add score
    //else:
    //  reset score
    //shuffle pokemonList
  }

  return (
    <>
      <header>
        <h1>Pokemon Memory Game</h1>
        <p>Click the images to gain points, but don't click the same one twice!</p>
      </header>
      <main>
        <button onClick={logPokemonList} className='hidden'>Log Pokemon List</button>
        
        {pokemonList.map(pokemon => {
          return (
            <Card
              key={`${pokemon.name} card`}
              character={pokemon}
            />
          )
        })}
      </main>
    </>
  )
}

export default App
