import { Navigate, Outlet } from "react-router-dom";
import { useName } from "../contexts/NameContext";

function Protected({ children }) {
  const [state] = useName();

  if (!state.name) {
    return <Navigate to='/' />;
  }

  return children ? children : <Outlet />;
}

export default Protected;
