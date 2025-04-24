import { Route, Routes } from "react-router-dom";
import Home from "../app/Home";
import Protected from "./Protected";
import MainLayout from "../layout/MainLayout";
import Details from "../app/details/Details";
import Pokedex from "../app/pokedex/Pokedex";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/pokedex"
        element={
          <Protected>
            <MainLayout />
          </Protected>
        }
      >
        <Route index element={<Pokedex />} />
        <Route path=":name" element={<Details />} />
      </Route>
      <Route path="*" element={<h2>404 Not Found</h2>} />
    </Routes>
  );
}

export default App;
