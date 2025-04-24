// PokemonsList.jsx
import PokemonsCard from "./PokemonsCard";

function PokemonsList({ pokemons }) {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
      {pokemons.map(pokemon => (
        <PokemonsCard key={pokemon.name} url={pokemon.url} />
      ))}
      {pokemons.length === 0 && <p>No hay pokemons</p>}
    </div>
  );
}

export default PokemonsList;
