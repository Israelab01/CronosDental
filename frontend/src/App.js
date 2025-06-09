import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Clients from "./components/Clients";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="*" element={<Login />} /> {}
      </Routes>
    </Router>
  );
}

export default App;