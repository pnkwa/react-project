import React, { useEffect } from "react";
import Home from "./componants/Home";
import { Routes, Route } from "react-router-dom";
import Genres from "./componants/Genres";
import GenresC from "./componants/GenresC";

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      {/* <Route path="/genres/:genre" element={<Genres />} /> */}
      {/* <Route path="/anime-details/:id" element={<Genres key="genres" />} />   */}
      <Route path="/" element={<GenresC selectedGenre={'Fantasy'}/>} />
      {/* <Route path="/" element={<GenresC />} /> */}
    </Routes>
  );
}

export default App;
