import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/home.jsx";
import FullDashboard from "./pages/vbv-dashboard.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        {/* Rota principal com layout */}
        <Route path="/" element={<App />}>
          
          {/* Página inicial */}
          <Route index element={<Home />} />

          {/* Página do dashboard completo */}
          <Route path="full-dashboard" element={<FullDashboard />} />

          {/* Futuras rotas:
              /import
              /config
              /report
          */}
        </Route>

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);