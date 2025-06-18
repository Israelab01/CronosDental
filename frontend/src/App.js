import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Clients from "./components/Clients";
import Dashboard from "./components/Dashboard";
import Orders from "./components/Orders"; // <-- Nueva importación

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Orders />} />
      </Routes>
    </Router>
  );
}

export default App;
