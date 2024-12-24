// import { useEffect, useState } from "react";
// import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";
import usePokemonList from "../../hooks/usePokemonList";

function PokemonList() {
  //   const [x, setX] = useState(0);
  //   const [y, setY] = useState(0);

  //   useEffect(() => {
  //     console.log("effect called");
  //   }, [x]);

  // const [pokemonList, setPokemonList] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [pokedexUrl, setPokedexUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  // const [nextUrl, setNextUrl]= useState('');
  // const [prevUrl, setPrevUrl]= useState('');

//   const [pokemonListState , setPokemonListState] = useState({
//     pokemonList:[],
//     isLoading:true,
//     pokedexUrl:"https://pokeapi.co/api/v2/pokemon",
//     nextUrl:'',
//     prevUrl:''
//   })
//   async function downloadPokemons() {
//     setPokemonListState({...pokemonListState , isLoading:true})
//     // setIsLoading(true);
//     const response = await axios.get(pokemonListState.pokedexUrl); // downloads list of 20 pokemons   , pokedexUrl

//     const pokemonResults = response.data.results; // we get array of pokemon from results

//     console.log("Response is " ,response.data , response.data.next);
//     console.log(pokemonListState);

//     setPokemonListState((state) => ({...state ,
//        nextUrl: response.data.next,
//         prevUrl:response.data.previous}))
//     // setNextUrl(response.data.next);
//     // setPrevUrl(response.data.previous);

//     //iterating over the array elements, and using their url, to create an array of promises
//     //that will download those 20 pokemons
//     const pokemonResultPromise = pokemonResults.map((pokemon) =>
//       axios.get(pokemon.url)
//     );

//     //passing that promise array to axios.all
//     const pokemonData = await axios.all(pokemonResultPromise);

//     //gives array of 20 pokemon detailed data
//     console.log(pokemonData);

//     //now iterate on data of each pokemon, and extract id, name, image, types
//     const pokeListResult = pokemonData.map((pokeData) => {
//       const pokemon = pokeData.data;
//       return {
//         id: pokemon.id,
//         name: pokemon.name,
//         image: pokemon.sprites.other
//           ? pokemon.sprites.other.dream_world.front_default
//           : pokemon.sprites.front_shiny,
//         types: pokemon.types,
//       };
//     });

//     console.log(pokeListResult);
//     setPokemonListState((state) => ({...state ,pokemonList: pokeListResult, isLoading: false}))
//     // setPokemonList(pokeListResult);
//     // setIsLoading(false);
//   }

// //   useEffect must not return anything besides a function, which is used for clean-up.
//   useEffect(() => {
//     downloadPokemons();
//   }, [pokemonListState.pokedexUrl]);   //pokedexUrl


const [pokemonListState,setPokemonListState]= usePokemonList(false);
  
  return (
    <>
      <div className="pokemon-list-wrapper">

        <h1 className="heading">Pokemon List</h1>

        <div className="pokemon-wrapper">
          {pokemonListState.isLoading
            ? "Loading....."
            : pokemonListState.pokemonList.map((p) => (
                <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
              ))}
        </div>

        <div className="controls">
            <button disabled={pokemonListState.prevUrl == null} onClick={() => {
              const urlToSet = pokemonListState.prevUrl;
              setPokemonListState({ ...pokemonListState, pokedexUrl:urlToSet})
            }}>Prev</button>

            <button disabled={pokemonListState.nextUrl == null} onClick={() => {
              const urlToSet = pokemonListState.nextUrl;
              setPokemonListState({ ...pokemonListState, pokedexUrl:urlToSet})
            }}>Next</button>
        </div>

      </div>

      {/* <div>
        X :{x} <button onClick={() => setX(x + 1)}>IncreaseX</button>
      </div>

      <div>
        Y :{y} <button onClick={() => setY(y + 1)}>IncreaseY</button>
      </div> */}
    </>
  );
}

export default PokemonList;
