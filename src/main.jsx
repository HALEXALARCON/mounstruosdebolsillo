import React from "react";
import { createRoot } from "react-dom/client";
import { NameProvider } from "./contexts/NameContext.jsx";
import { HashRouter } from "react-router-dom";
import App from "./routes/App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NameProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </NameProvider>
  </React.StrictMode>
);
