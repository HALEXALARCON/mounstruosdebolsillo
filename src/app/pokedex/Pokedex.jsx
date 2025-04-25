import { useEffect, useState } from "react";
import axios from "axios";
import PokemonsList from "../../components/PokemonsList";
import PokemonsCard from "../../components/PokemonsCard";
import pokemonCenter from "../../assets/pokemon-center.mp4";

const baseUrl = "https://pokeapi.co/api/v2/pokemon";

// Componente de Paginación con efecto de vidrio opaco y transparencia
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxPageNumbers = 22; // Mostrará un máximo de 22 números de página
  // Calcular el rango de páginas a mostrar
  let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
  let endPage = startPage + maxPageNumbers - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxPageNumbers + 1);
  }
  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex gap-2 justify-center items-center p-4 mb-4 bg-white/30 backdrop-blur-md rounded-md overflow-x-auto">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 transition duration-300"
      >
        Prev
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-md transition duration-300 ${page === currentPage
            ? "bg-red-600 text-white"
            : "bg-white text-black hover:bg-gray-200"
            }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 transition duration-300"
      >
        Next
      </button>
    </div>
  );
};

function Pokedex() {
  const trainerName = sessionStorage.getItem("trainerName");
  const [pokemons, setPokemons] = useState([]);
  const [singlePokemon, setSinglePokemon] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  // Estados para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 20;

  // Función para obtener todos los Pokémon
  const getPokemons = async () => {
    try {
      const response = await axios.get(`${baseUrl}?limit=1025`);
      setPokemons(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  // Cargar Pokémon al montar el componente
  useEffect(() => {
    getPokemons();
  }, []);

  // Cargar tipos de Pokémon
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/type?limit=21")
      .then((response) => {
        setTypes(response.data.results);
      })
      .catch((error) => console.error(error));
  }, []);

  // Filtro por tipo
  useEffect(() => {
    if (selectedType === "all") {
      setFilteredPokemons(pokemons);
      setSinglePokemon(null);
      return;
    }
    if (selectedType) {
      axios
        .get("https://pokeapi.co/api/v2/type/" + selectedType)
        .then((response) => {
          setFilteredPokemons(response.data.pokemon.map((p) => p.pokemon));
          setSinglePokemon(null);
        })
        .catch((error) => console.error(error));
    }
  }, [selectedType, pokemons]);

  // Filtro por búsqueda
  useEffect(() => {
    if (!search) {
      setFilteredPokemons(pokemons);
      setSinglePokemon(null);
      return;
    }
    setFilteredPokemons(
      pokemons.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, pokemons]);

  // Resetea la página actual cuando cambia el listado filtrado
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredPokemons]);

  // Búsqueda de un Pokémon específico para ver su detalle
  const searchPokemons = () => {
    if (!search) {
      setFilteredPokemons(pokemons);
      setSinglePokemon(null);
      return;
    }
    axios
      .get(`${baseUrl}/${search.toLowerCase()}`)
      .then((response) => {
        setSinglePokemon(`${baseUrl}/${response.data.name}`);
      })
      .catch((error) => console.error(error));
  };

  // Cálculo de la paginación
  const totalPokemons = filteredPokemons.length;
  const totalPages = Math.ceil(totalPokemons / pokemonsPerPage);
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = filteredPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  // Función para cambiar de página
  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  return (
    <div className="relative">
      {/* Video de fondo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 object-cover w-full h-full z-[-1]"
      >
        <source src={pokemonCenter} type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>

      <div className="relative pt-32 px-4">
        {/* Título */}
        <h2 className="mb-4 text-center text-3xl font-semibold text-white drop-shadow">
          <span className="text-red-700">
            Welcome {trainerName || "Entrenador"}
          </span>
          , here you will find your favorite Pokémon
        </h2>

        {/* Paginación en la parte superior, visible sólo si se muestra la lista y hay más de 1 página */}
        {!singlePokemon && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        {/* Buscador y filtros */}
        <div className="mb-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {/* Input + Botón */}
          <div className="flex w-full max-w-md shadow-lg">
            <input
              type="text"
              placeholder="Search for Pokémon..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-grow px-4 py-2 bg-white/70 backdrop-blur-md text-black placeholder-gray-600 rounded-l-full focus:outline-none"
            />
            <button
              onClick={searchPokemons}
              className="px-6 py-2 bg-red-500 text-white font-semibold rounded-r-full hover:bg-red-600 transition-all duration-300"
            >
              Search
            </button>
          </div>

          {/* Filtro por tipo */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 bg-white/70 backdrop-blur-md text-black rounded-full shadow-md focus:outline-none capitalize"
          >
            <option value="all">All Pokémons</option>
            {types.map((type) => (
              <option key={type.name} value={type.name} className="capitalize">
                {type.name}
              </option>
            ))}
          </select>
        </div>

        {/* Mostrar resultados */}
        {singlePokemon ? (
          // Al buscar un solo Pokémon se pasa la prop isSingle para ajustar estilos en la tarjeta
          <PokemonsCard url={singlePokemon} isSingle={true} />
        ) : (
          <>
            <PokemonsList pokemons={currentPokemons} />
            {/* Si se desea, se puede colocar la paginación también en la parte inferior */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Pokedex;
