import { Navigate, Outlet } from "react-router-dom";

function Protected({ children }) {
  // Leemos directamente de sessionStorage
  const storedName = sessionStorage.getItem("trainerName");

  // Si no hay nombre guardado, redirigimos al Home (reemplazando el historial)
  if (!storedName) {
    return <Navigate to="/" replace />;
  }

  // Si hay nombre, renderizamos los children o el <Outlet/> para rutas anidadas
  return children || <Outlet />;
}

export default Protected;
