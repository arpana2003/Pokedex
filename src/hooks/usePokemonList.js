import axios from "axios";
import { useState, useEffect } from "react";

// "https://pokeapi.co/api/v2/pokemon"

function usePokemonList() {
  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    isLoading: true,
    pokedexUrl: "https://pokeapi.co/api/v2/pokemon",
    nextUrl: "",
    prevUrl: "",
  });

  async function downloadPokemons() {
    
      setPokemonListState((state)=>({ ...state, isLoading: true }));

      const response = await axios.get(pokemonListState.pokedexUrl); // downloads list of 20 pokemons

      const pokemonResults = response.data.results; // we get array of pokemon from results

      setPokemonListState((state) => ({
        ...state,
        nextUrl: response.data.next,
        prevUrl: response.data.previous,
      }));

      //iterating over the array elements, and using their url, to create an array of promises
      //that will download those 20 pokemons

      const pokemonResultPromise = pokemonResults.map((pokemon) =>
        axios.get(pokemon.url)
      );

      //passing that promise array to axios.all
      const pokemonData = await axios.all(pokemonResultPromise);

      //gives array of 20 pokemon detailed data
      console.log(pokemonData);

      //now iterate on data of each pokemon, and extract id, name, image, types
      const pokeListResult = pokemonData.map((pokeData) => {
        const pokemon = pokeData.data;
        return {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.other
            ? pokemon.sprites.other.dream_world.front_default
            : pokemon.sprites.front_shiny,
          types: pokemon.types,
        };
      });

      setPokemonListState((state) => ({
        ...state,
        pokemonList: pokeListResult,
        isLoading: false,
      }));
    
  }

  useEffect(() => {
    downloadPokemons();
  }, [pokemonListState.pokedexUrl]);

  return [pokemonListState, setPokemonListState];
}

export default usePokemonList;
