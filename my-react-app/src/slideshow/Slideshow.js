import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const Slideshow = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [slideImages, setSlideImages] = useState([]);

  useEffect(() => {
    const showSlides = () => {
      const slides = document.getElementsByClassName("mySlides");

      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }

      setSlideIndex((prevIndex) =>
        prevIndex >= slides.length - 1 ? 0 : prevIndex + 1
      );

      slides[slideIndex].style.display = "block";
    };

    const interval = setInterval(showSlides, 4000);

    return () => clearInterval(interval);
  }, [slideIndex]);

  useEffect(() => {
    // Load all slide images from a directory (e.g., 'slideshow') dynamically
    const context = require.context(
      "/public/slideshow",
      false,
      /\.(png|jpe?g|svg)$/
    );
    const images = context.keys().map(context);
    setSlideImages(images);
  }, []);

  return (
    <div className="container--slideshow">
      <SlideshowLogo src="/sharp-logo.png" alt="img Logo" />
      <SlideshowContainer>
        {slideImages.map((imageSrc, index) => (
          <div key={index} className="mySlides fade">
            <SlideshowImage src={imageSrc} alt={`Slide ${index + 1}`} />
            <SlideshowOverlay />
          </div>
        ))}
      </SlideshowContainer>
    </div>
  );
};

const fade = keyframes`
  from {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
`;

const SlideshowContainer = styled.div`
  position: relative;
  width: 100%;
  height: 50%;
  margin-top: 40px;
  background-color: rgb(0, 0, 0);
`;

const SlideshowImage = styled.img`
  width: 100%;
  height: 625px;
  object-fit: cover;
  object-position: 100% 25%;
  transition: all ease 1.5s;
  animation: ${fade} 2s; /* Apply the fade animation with a duration of 2 seconds */
`;

const SlideshowOverlay = styled.div`
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, transparent 10%, black 90%);
  opacity: 1;
`;

const SlideshowLogo = styled.img`
  position: absolute;
  top: 350px;
  right: 630px;
  object-fit: none;
  z-index: 3;
`;

export default Slideshow;