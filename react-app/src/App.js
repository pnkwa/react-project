import React, { useEffect } from "react";
import Home from "./componants/Home";
import { Routes, Route } from "react-router-dom";
import Genres from "./componants/Genres";

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/" element={<Genres title="Fantasy" />} />
      {/* <Route path="/anime-details/:id" element={<Genres key="genres" />} />   */}
    </Routes>
  );
}

export default App;
