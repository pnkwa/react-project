import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';



function Slideshow() {
  const [slideIndex, setSlideIndex] = useState(1);
  const [slideImages, setSlideImages] = useState([]);

  useEffect(() => {
    // Load all slide images from a directory (e.g., 'slideshow') dynamically
    const context = require.context(
      '/public/slideshow',
      false,
      /\.(png|jpe?g|svg)$/
    );
    const images = context.keys().map(context);
    setSlideImages(images);
  }, []);

  function plusSlides(n) {
    let newIndex = slideIndex + n;
    if (newIndex > slideImages.length) {
      newIndex = 1;
    } else if (newIndex < 1) {
      newIndex = slideImages.length;
    }
    setSlideIndex(newIndex);
  }

  // Automatically advance to the next slide every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      plusSlides(1);
    }, 3000); // Change the duration here (in milliseconds) for the desired interval
    return () => clearInterval(intervalId);
  }, [slideIndex, plusSlides]); // Include plusSlides as a dependency

  return (
    <div>

      <SlideshowContainer>
      <SlideshowLogo src="/sharp-logo.png" alt="img Logo" />
        {slideImages.map((imageSrc, index) => (
          <MySlides
            key={index}
            style={slideIndex === index + 1 ? { display: 'block' } : {}}
          >
            <Img src={imageSrc} alt={`Slide ${index + 1}`} />
            <SlideshowOverlay />
          </MySlides>
        ))}
        <Prev onClick={() => plusSlides(-1)}>❮</Prev>
        <Next onClick={() => plusSlides(1)}>❯</Next>
      </SlideshowContainer>
    </div>
  );
}

export default Slideshow;

const SlideshowContainer = styled.div`
 
  position: relative;
  margin: auto;
`;

const FadeAnimation = keyframes`
  from {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
`;

const MySlides = styled.div`
  display: none;
  animation-name: ${FadeAnimation};
  animation-duration: 1.5s;
  width: 100%;
`;

const Img = styled.img`
  vertical-align: middle;
  width: 100%;
  height: 625px;
  object-fit: cover;
  object-position: 100% 25%;
  transition: all ease 1.5s;
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


const Prev = styled.a`
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  padding: 16px;
  margin-top: -22px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
  left: 0;
  border-radius: 3px 0 0 3px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const Next = styled.a`
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  padding: 16px;
  margin-top: -22px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
  right: 0;
  border-radius: 3px 0 0 3px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;
const SlideshowLogo = styled.img`
  position: absolute;
  top: 350px;
  right: 630px;
  object-fit: none;
  z-index: 3;
`;