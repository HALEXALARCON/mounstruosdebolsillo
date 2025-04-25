import { Navigate, Outlet } from "react-router-dom";
import { useName } from "../contexts/NameContext";

function Protected({ children }) {
  // Desestructuramos directamente el nombre del estado
  const [{ name }] = useName();

  // Si no hay nombre, redirigimos al Home reemplazando la entrada en el historial
  if (!name) {
    return <Navigate to="/" replace />;
  }

  // Renderizamos los children si vienen, o el <Outlet /> para rutas anidadas
  return children || <Outlet />;
}

export default Protected;
