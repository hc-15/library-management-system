import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/home";
import Dashboard from "./components/dashboard";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;