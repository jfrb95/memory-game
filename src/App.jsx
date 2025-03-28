import { useState, useEffect } from 'react'
import { toTitleCase } from './utils';
import './styles/App.css'

function App() {
  
  const rootUrl = 'https://pokeapi.co/api/v2/pokemon/';

  const [nameList, setNameList] = useState([]);
  const [imgList, setImgList] = useState([]);
  const [loading, setLoading] = useState(true);

  const pokedexNumbers = [1, 6, 8, 11, 15, 17, 19, 25, 28, 34, 39, 41];
  
  
  {
  const number = 31
  const request = new Request(rootUrl + number);

  useEffect(() => {
    (async function fetchPokemon() {
      await fetch(request)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch Pokemon #${number}`);
          }
          return response.json()
        })
    })();
  })
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
        <Card/>
      </main>
    </>
  )
}

export default App
