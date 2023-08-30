import React, { useEffect } from "react";
import Home from "./componants/Home";
import { Routes, Route } from "react-router-dom";
import Genres from "./componants/Genres";
import GlobalStyle from "./GlobalStyle";
import Navbar from "./componants/Navbar";

function App() {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genres/:genreId" element={<Genres />} />
      </Routes>
    </>
  );
}

export default App;
