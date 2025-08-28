import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importe seus componentes de página
import Home from "./pages/Home";
import Users from "./pages/Users";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;