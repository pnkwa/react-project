import React, { useEffect } from "react";
import Home from "./componants/Home";
import { Routes, Route } from "react-router-dom";
import { useGlobalContext } from "./context/global"

function App() {
  
  return (
      <Routes>
        <Route path="/" element={<Home key="home" />} />
      </Routes>
  );
}

export default App;
