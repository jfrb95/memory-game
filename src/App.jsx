import { useState, useEffect } from 'react'
import { toTitleCase } from './utils';
import './styles/App.css'

function App() {
  
  const rootUrl = 'https://pokeapi.co/api/v2/pokemon/';

  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  const pokedexNumbers = [1, 6, 8, 11, 15, 17, 19, 25, 28, 34, 39, 41];

  //loggin pokemonList after running useEffect gives an array of 12 undefineds

  useEffect(() => {
    (async function fetchPokemon() {
      const pokePromises = pokedexNumbers.map(number => {
        const request = new Request(rootUrl + number);
        fetch(request)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Failed to fetch Pokemon #${number}`);
            }
            return response.json()
          });
      })

      const pokeResults = await Promise.all(pokePromises);
      const pokemon = pokeResults.reduce((acc, curr) => {
        acc.push(curr)
        return acc
      }, [])
      setPokemonList(pokemon);
    })();
    console.log(pokemonList);
  }, []);
  
  function logPokemonList() {
    console.log(pokemonList);
  }

  function Card() {

  }

  return (
    <>
      <header>
        <h1>Pokemon Memory Game</h1>
        <p>Click the images to gain points, but don't click the same one twice!</p>
      </header>
      <main>
        <button onClick={logPokemonList}>Log Pokemon List</button>
        <Card/>
      </main>
    </>
  )
}

export default App
