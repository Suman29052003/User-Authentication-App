import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../src/assets/Components/Login";
import Home from "./assets/Components/Home";


// You can define the default configuration for toast here

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>

    </Router>
  );
};

export default App;
