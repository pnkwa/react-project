import React from "react";
import Home from "./componants/Home";
import { Routes, Route, useLocation} from "react-router-dom";
import Genres from "./componants/Genres";
import GlobalStyle from "./GlobalStyle";
import Navbar from "./componants/Navbar";
import Slideshow from "./componants/Slideshow";
import Container from "./componants/Container";
import NotFound from "./componants/NotFound";
import Footer from "./componants/Footer";
import TestSearch from "./componants/TestSearch";

function App() {
  // const location = useLocation();
  // const showSlideshow = !location.pathname.includes("/anime/") && location.pathname !== "*";

  return (
    <>
      <GlobalStyle />
      <Navbar />
      <Container>
      <Slideshow />
      {/* {showSlideshow && <Slideshow />} */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/genres/:genreId" element={<Genres />} />
          <Route path="/testSearch" element={<TestSearch />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;

 {/* <Route path="/anime/:id" element={<Slide />} /> */}