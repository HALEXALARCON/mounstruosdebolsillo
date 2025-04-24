import { Outlet } from "react-router-dom";
import pokebola from "../assets/pokebola.png";

function MainLayout() {
  return (
    <div className="relative">
      {/* Encabezado con fondo rojo */}
      <div className="bg-red-600 w-full h-20 relative">
        {/* Imagen de la pokebola posicionada al final del encabezado */}
        <img
          src={pokebola}
          alt="Pokebola"
          className="absolute left-1/2 transform -translate-x-1/2 bottom-[-40px] w-24 h-24"
        />
      </div>

      {/* Pie de página con fondo negro */}
      <div className="bg-black w-full h-12"></div>

      {/* Contenido principal */}
      <Outlet />
    </div>
  );
}

export default MainLayout;
