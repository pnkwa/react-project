import React from "react";
import Home from "./componants/Home";
import { Routes, Route } from "react-router-dom";
import Genres from "./componants/Genres";
import GlobalStyle from "./GlobalStyle";
import Navbar from "./componants/Navbar";
import Slideshow from "./componants/Slideshow";
import Container from "./componants/Container";
import NotFound from "./componants/NotFound";
import Footer from "./componants/Footer";
import TestSearch from "./componants/TestSearch";

function App() {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <Container>
        <Slideshow />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/genres/:genreId" element={<Genres />} />
          <Route path="/testSearch" element={<TestSearch />} />
          {/* <Route path="/anime-details/:id" element={<Slide />} /> */}
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;
