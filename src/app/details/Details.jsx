// Details.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import pokeballHouse from "../../assets/pokeball-house.1920x1080.mp4";

const ProgressBar = ({ value, max = 150 }) => {
  const percentage = Math.min((value / max) * 100, 100);
  return (
    <div className="w-full bg-gray-300 rounded-full h-6 overflow-hidden shadow-inner">
      <div
        className="h-full bg-gradient-to-r from-yellow-400 to-red-500 transition-all duration-500"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

function Details() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (name) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((res) => {
          setPokemon(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [name]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!pokemon) return <div className="text-center py-20">Pokémon not found.</div>;

  const type = pokemon.types[0]?.type.name || "normal";

  const typeGradients = {
    fire: "from-red-500 to-yellow-500",
    water: "from-blue-500 to-indigo-500",
    grass: "from-green-500 to-lime-400",
    electric: "from-yellow-400 to-yellow-600",
    ice: "from-blue-300 to-blue-600",
    psychic: "from-pink-500 to-pink-700",
    dragon: "from-indigo-500 to-purple-700",
    dark: "from-gray-700 to-black",
    fairy: "from-pink-300 to-pink-500",
    normal: "from-gray-300 to-gray-500",
    bug: "from-green-400 to-green-700",
    ground: "from-yellow-600 to-yellow-800",
    rock: "from-yellow-700 to-gray-600",
    ghost: "from-purple-600 to-indigo-800",
    poison: "from-purple-500 to-purple-700",
    fighting: "from-red-700 to-orange-700",
    flying: "from-sky-400 to-indigo-500",
    steel: "from-gray-400 to-gray-600",
  };

  const gradient = typeGradients[type] || "from-gray-300 to-gray-500";

  return (
    <div className="relative min-h-screen">
      {/* Video de fondo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src={pokeballHouse} type="video/mp4" />
        Your browser does not support the video.
      </video>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
        {/* Card del Pokémon */}
        <div
          className={`w-full h-[460px] rounded-3xl shadow-2xl flex items-center justify-center relative bg-gradient-to-br ${gradient}`}
        >
          <img
            className="max-h-[360px] object-contain animate-pulse duration-1000 drop-shadow-2xl"
            src={pokemon.sprites?.other["official-artwork"]?.front_default}
            alt={pokemon.name}
          />
          <div className="absolute top-6 left-6 backdrop-blur-md bg-white/30 px-5 py-2 rounded-full text-3xl font-bold capitalize shadow-md text-black">
            {pokemon.name}
          </div>
        </div>

        {/* Tipos */}
        <div className="flex justify-center gap-4 flex-wrap">
          {pokemon.types.map((t, i) => (
            <span
              key={i}
              className={`capitalize px-6 py-3 rounded-full text-white font-bold shadow-lg text-xl transition-transform transform hover:scale-105 
                bg-gradient-to-br ${typeGradients[t.type.name] || "from-gray-300 to-gray-500"
                }`}
            >
              {t.type.name}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="space-y-6 bg-white/20 backdrop-blur-xl p-6 rounded-2xl shadow-xl">
          <h3 className="text-3xl font-bold text-center">Statistics</h3>
          {pokemon.stats
            .filter(
              (s) =>
                s.stat.name !== "special-attack" &&
                s.stat.name !== "special-defense"
            )
            .map((s, i) => (
              <div
                key={i}
                className="flex items-center space-x-6 text-lg font-semibold"
              >
                <span className="w-40 capitalize">{s.stat.name}</span>
                <ProgressBar value={s.base_stat} />
                <span className="w-12 text-right">{s.base_stat}</span>
              </div>
            ))}
        </div>

        {/* Skills */}
        <div className="space-y-4 bg-white/20 backdrop-blur-xl p-6 rounded-2xl shadow-xl">
          <h3 className="text-3xl font-bold text-center">Skills</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {pokemon.abilities.map((ab, index) => (
              <div
                key={index}
                className="bg-blue-600 text-white px-5 py-2 rounded-full text-xl shadow-lg transition transform hover:scale-105"
              >
                {ab.ability.name}
              </div>
            ))}
          </div>
        </div>

        {/* Moves */}
        <div className="space-y-4 bg-white/20 backdrop-blur-xl p-6 rounded-2xl shadow-xl">
          <h3 className="text-3xl font-bold text-center">Top Moves</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {pokemon.moves.slice(0, 5).map((move, index) => (
              <div
                key={index}
                className="bg-purple-500 text-white px-4 py-2 rounded-full text-lg font-medium shadow-md transition transform hover:scale-105"
              >
                {move.move.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
