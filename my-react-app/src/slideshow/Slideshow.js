import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

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

const SlideshowText = styled.div`
  color: #f2f2f2;
  font-size: 15px;
  padding: 8px 12px;
  position: absolute;
  bottom: 8px;
  width: 100%;
  text-align: center;
`;

const Slideshow = () => {
  const [slideIndex, setSlideIndex] = useState(0);

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

  return (
    <SlideshowContainer>
      <div className="mySlides fade">
        <SlideshowImage src="slide-1.png" alt="Slide 1" />
        <SlideshowOverlay />
        <SlideshowText>Caption Text 1</SlideshowText>
      </div>
      <div className="mySlides fade">
        <SlideshowImage src="slide-2.png" alt="Slide 2" />
        <SlideshowOverlay />
        <SlideshowText>Caption Text 2</SlideshowText>
      </div>
      <div className="mySlides fade">
        <SlideshowImage src="slide-3.png" alt="Slide 3" />
        <SlideshowOverlay />
        <SlideshowText>Caption Text 3</SlideshowText>
      </div>
      <div className="mySlides fade">
        <SlideshowImage src="slide-4.png" alt="Slide 4" />
        <SlideshowOverlay />
        <SlideshowText>Caption Text 4</SlideshowText>
      </div>
      <div className="mySlides fade">
        <SlideshowImage src="slide-5.png" alt="Slide 5" />
        <SlideshowOverlay />
        <SlideshowText>Caption Text 5</SlideshowText>
      </div>
      <div className="mySlides fade">
        <SlideshowImage src="slide-6.png" alt="Slide 6" />
        <SlideshowOverlay />
        <SlideshowText>Caption Text 6</SlideshowText>
      </div>
      <div className="mySlides fade">
        <SlideshowImage src="slide-7.png" alt="Slide 7" />
        <SlideshowOverlay />
        <SlideshowText>Caption Text 7</SlideshowText>
      </div>
      <div className="mySlides fade">
        <SlideshowImage src="slide-8.png" alt="Slide 8" />
        <SlideshowOverlay />
        <SlideshowText>Caption Text 8</SlideshowText>
      </div>
      <div className="mySlides fade">
        <SlideshowImage src="slide-9.png" alt="Slide 9" />
        <SlideshowOverlay />
        <SlideshowText>Caption Text 9</SlideshowText>
      </div>
    </SlideshowContainer>
  );
};

export default Slideshow;
