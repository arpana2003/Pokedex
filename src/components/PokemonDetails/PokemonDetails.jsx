import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PokemonDetails.css";
import usePokemonList from "../../hooks/usePokemonList";
import usePokemonDetails from "../../hooks/usePokemonDetails";

function PokemonDetails({pokemonName}) {
  const { id } = useParams();
  const [pokemon] = usePokemonDetails(id, pokemonName);
  // const [pokemon, setPokemon] = useState({});
  // let pokemonListHookResponse = [];
  // console.log(id);

  // async function downloadPokemon() {
  
  //   const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  //   console.log(response.data);

  //   setPokemon({
  //     name: response.data.name,
  //     image: response.data.sprites.other.dream_world.front_default,
  //     weight: response.data.weight,
  //     height: response.data.height,
  //     types: response.data.types.map((t) => t.type.name),
  //   });
  //    return response;
  // }

  // pokemonListHookResponse = usePokemonList(
  //   `https://pokeapi.co/api/v2/type/${pokemon.types ? pokemon.types[0] : 'fire'}` ,true
  // );

  

  // // The useEffect hook is a built-in React hook that allows you to perform side effects in function components.
  // useEffect(() => {
  //   downloadPokemon();
  //   console.log("list  " , pokemon.types);
  // }, []);

  return (
    <div className="pokemon-details-wrapper">
      <img className="pokemon-details-image" src={pokemon.image} />
      <div className="pokemon-details-name">
        <span>{pokemon.name}</span>
      </div>
      <div className="pokemon-details-name">Height : {pokemon.height}</div>
      <div className="pokemon-details-name">Weight : {pokemon.weight}</div>
      <div className="pokemon-details-types">
        {pokemon.types && pokemon.types.map((t) => <div key={t}> {t} </div>)}
      </div>

      {
        pokemon.types && pokemon.similarPokemons &&
        <div>
          More {pokemon.types[0]} type pokemons:

          <ul>
             {pokemon.similarPokemons.map((p) => <li key={p.pokemon.url}>{p.pokemon.name}</li>)}
          </ul>
        </div>
      }

    </div>
  );
}

export default PokemonDetails;
