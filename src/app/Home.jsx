import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import dynamaxBattle from "../assets/dynamax-battle.mp4";
import pokebola from "../assets/pokebola.png"; // Asegúrate de que la ruta sea correcta

function Home() {
  const [trainerName, setTrainerName] = useState("");
  const [isReturningTrainer, setIsReturningTrainer] = useState(false);
  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    const storedName = sessionStorage.getItem("trainerName");
    if (storedName) {
      setTrainerName(storedName);
      setIsReturningTrainer(true);
    }
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  const handleInputChange = (e) => {
    setTrainerName(e.target.value);
    setIsReturningTrainer(false);
  };

  const handleNewTrainer = () => {
    if (trainerName.trim() !== "") {
      sessionStorage.setItem("trainerName", trainerName.trim());
      navigate("/pokedex");
    } else {
      alert("Por favor, ingresa un nombre válido.");
    }
  };

  const handleReturnTrainer = () => {
    navigate("/pokedex");
  };

  return (
    <div className="relative w-full h-screen flex flex-col justify-center items-center">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 object-cover w-full h-full"
      >
        <source src={dynamaxBattle} type="video/mp4" />
        Your browser does not support the video element.
      </video>

      {/* Contenido principal */}
      <div className="relative text-center mb-8 z-10">
        <h1 className="text-5xl font-bold mb-4 text-white drop-shadow-lg">POKÉDEX</h1>
        {isReturningTrainer ? (
          <>
            <h2 className="text-2xl font-medium text-red-700 mb-4">Welcome back, {trainerName}!</h2>
            <p className="text-cyan-950 font-semibold mb-4">
              Do you want to continue or start as a new coach?
            </p>
            <div className="space-y-4">
              <div className="flex justify-center">
                <input
                  type="text"
                  placeholder="Ingresa tu nombre"
                  value={trainerName}
                  onChange={handleInputChange}
                  className="input"
                />
                <button onClick={handleNewTrainer} className="btn">New Trainer</button>
              </div>
              <div className="flex justify-center">
                <button onClick={handleReturnTrainer} className="btn btn-rounded">Continue</button>
              </div>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-medium text-red-700 mb-4">Hello Trainer!</h2>
            <p className="text-cyan-950 font-semibold mb-4">
              To access the Pokédex, please enter your name:
            </p>
            <div className="flex justify-center">
              <input
                type="text"
                placeholder="Ingresa tu nombre"
                value={trainerName}
                onChange={handleInputChange}
                className="input"
              />
              <button onClick={handleNewTrainer} className="btn">Get into</button>
            </div>
          </>
        )}
      </div>

      {/* Fondo inferior con pokebola */}
      <div className="absolute left-0 bottom-0 w-full">
        <div className="relative bg-red-600 w-full h-20">
          <img
            src={pokebola}
            alt="Pokebola"
            className="absolute left-1/2 transform -translate-x-1/2 bottom-[-40px] w-24 h-24"
          />
        </div>
        <div className="bg-black w-full h-12"></div>
      </div>
    </div>
  );
}

export default Home;
