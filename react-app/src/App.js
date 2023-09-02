import React from "react";
import Home from "./components/Home";
import { Routes, Route, useLocation, Switch} from "react-router-dom";
import Genres from "./components/Genres";
import GlobalStyle from "./GlobalStyle";
import Navbar from "./components/Navbar";
import Slideshow from "./components/Slideshow";
import Container from "./components/Container";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";
import TestSearch from "./components/TestSearch";
import Slide from "./components/Slide";

function App() {
  const location = useLocation();
  const showSlideshow = !location.pathname.includes("/anime/");

  return (
    <>
      <GlobalStyle />
      <Navbar />
      <Container>
       {showSlideshow && <Slideshow />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/genres/:genreId" element={<Genres />} />
          <Route path="/testSearch" element={<TestSearch />} />
          <Route path="/anime/:id" element={<Slide />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;

