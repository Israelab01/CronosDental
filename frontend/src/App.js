import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Clients from "./components/Clients";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="*" element={<Clients />} /> {/* Por defecto muestra Clients */}
      </Routes>
    </Router>
  );
}

export default App;
