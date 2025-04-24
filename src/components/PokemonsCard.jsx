import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProgressBar = ({ value, max = 150, colorClass = "bg-blue-500" }) => {
  const percentage = Math.min((value / max) * 100, 100);
  return (
    <div className="w-full h-3 bg-gray-300 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-700 ${colorClass}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

function PokemonsCard({ url, isSingle = false }) {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => setPokemon(response.data))
      .catch((error) => console.error(error));
  }, [url]);

  if (!pokemon || !pokemon.types) return null;

  const primaryType = pokemon.types[0].type.name;

  // Gradientes y glow por tipo
  const gradients = {
    grass: "from-green-400 to-green-600",
    fire: "from-red-500 to-yellow-500",
    water: "from-blue-400 to-blue-700",
    electric: "from-yellow-300 to-yellow-600",
    bug: "from-lime-400 to-lime-600",
    normal: "from-gray-300 to-gray-500",
    poison: "from-purple-400 to-purple-700",
    ground: "from-yellow-600 to-orange-600",
    fairy: "from-pink-300 to-pink-500",
    fighting: "from-orange-500 to-red-700",
    psychic: "from-pink-400 to-pink-600",
    rock: "from-yellow-700 to-yellow-900",
    ghost: "from-indigo-400 to-indigo-700",
    ice: "from-cyan-300 to-cyan-600",
    dragon: "from-indigo-500 to-indigo-900",
    dark: "from-gray-600 to-gray-900",
    steel: "from-gray-400 to-gray-600",
    flying: "from-sky-300 to-sky-600",
  };

  const glowColors = {
    grass: "0 0 10px #38a169",
    fire: "0 0 10px #f56565",
    water: "0 0 10px #4299e1",
    electric: "0 0 10px #ecc94b",
    bug: "0 0 10px #a3e635",
    normal: "0 0 10px #a0aec0",
    poison: "0 0 10px #9f7aea",
    ground: "0 0 10px #d69e2e",
    fairy: "0 0 10px #f687b3",
    fighting: "0 0 10px #ed8936",
    psychic: "0 0 10px #fbb6ce",
    rock: "0 0 10px #b7791f",
    ghost: "0 0 10px #667eea",
    ice: "0 0 10px #81e6d9",
    dragon: "0 0 10px #805ad5",
    dark: "0 0 10px #4a5568",
    steel: "0 0 10px #cbd5e0",
    flying: "0 0 10px #63b3ed",
  };

  const gradientClass = gradients[primaryType] || "from-gray-300 to-gray-500";
  const glowStyle = { textShadow: glowColors[primaryType] || "0 0 10px white" };

  // Si es una vista con un solo Pokémon, eliminamos la altura fija y restringimos el ancho.
  const containerClass = isSingle
    ? "block max-w-md mx-auto rounded-[2rem] overflow-hidden bg-white/20 backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
    : "block h-[28rem] rounded-[2rem] overflow-hidden bg-white/20 backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105";

  return (
    <Link
      to={`/pokedex/${pokemon.name}`}
      className={containerClass}
      style={{
        boxShadow: `0 0 0 8px rgba(255,255,255,0.2), 0 0 16px 4px ${glowColors[primaryType]?.split(" ")[3] || "#ccc"
          }`,
      }}
    >
      {/* Imagen - fondo translúcido */}
      <div className="relative bg-white/20 backdrop-blur-md">
        <div className="aspect-video overflow-hidden">
          <img
            className="w-full h-full object-contain transition-transform duration-500 hover:scale-110"
            src={pokemon.sprites?.other["official-artwork"]?.front_default}
            alt={pokemon.name}
          />
        </div>

        {/* Nombre con glow por tipo */}
        <div
          className="absolute top-2 left-2 bg-white/30 backdrop-blur-md px-4 py-1 rounded-full font-bold text-lg capitalize text-black transition duration-300"
          style={glowStyle}
        >
          {pokemon.name}
        </div>
      </div>

      {/* Info con gradiente */}
      <div className={`p-4 space-y-4 text-white bg-gradient-to-b ${gradientClass}`}>
        {/* Tipos en botones gradiente */}
        <div className="flex gap-2 justify-center">
          {pokemon.types.map((t, index) => (
            <span
              key={index}
              className={`capitalize px-4 py-1 rounded-full text-white font-semibold shadow-md bg-gradient-to-r ${gradients[t.type.name] || "from-gray-400 to-gray-600"
                }`}
            >
              {t.type.name}
            </span>
          ))}
        </div>

        {/* Stats - quitando special-attack y special-defense */}
        <ul className="space-y-2">
          {pokemon.stats
            .filter(
              (stat) =>
                stat.stat.name !== "special-defense" &&
                stat.stat.name !== "special-attack"
            )
            .map((stat, index) => (
              <li key={index} className="flex items-center gap-2 text-base">
                <span className="w-24 text-sm text-gray-200">
                  {stat.stat.name.toUpperCase()}:
                </span>
                <ProgressBar
                  value={stat.base_stat}
                  colorClass={`bg-${primaryType}`}
                />
                <span className="w-8 text-right text-sm">
                  {stat.base_stat}
                </span>
              </li>
            ))}
        </ul>
      </div>
    </Link>
  );
}

export default PokemonsCard;
