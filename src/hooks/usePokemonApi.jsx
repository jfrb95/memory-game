import { useState, useEffect } from "react";
import { shuffle } from "../utils";

export default function usePokemonApi() {

  const rootUrl = 'https://pokeapi.co/api/v2/pokemon/';

  const [data, setData] = useState([]);
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
        acc.push({
          name: curr.name,
          img: curr.sprites.other['official-artwork']['front_default'],
          id: curr.id
          }
        );
        return acc;
      }, []);
      setData(pokemon);
      setLoading(false);
    })();

  }, []);

  function shuffleData() {
    setData(prevData => shuffle(prevData));
  }

  return {
    data,
    loading,
    shuffleData
  }
}