import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import axios from "../axios";
import { Link } from "react-router-dom";
import styled from "styled-components";

// const baseURL = "https://api.jikan.moe/v4/";

function AnimeRow({ title, fetchUrl, className }) {
  const [animes, setAnimes] = useState([]);
  const animeRowRef = useRef(null);

  useEffect(() => {
    async function fetchAnimeData() {
      const request = await axios.get(fetchUrl);
      setAnimes(request.data.data);
      return request;
    }
    fetchAnimeData();
  }, [fetchUrl]);

  const sideScroll = (element, speed, step, viewportFactor) => {
    let scrollAmount = 0;
    const calculateDistance = () => {
      const viewportWidth = window.innerWidth;
      return viewportWidth * viewportFactor;
    };
    const slideTimer = setInterval(() => {
      element.scrollLeft += step;
      scrollAmount += Math.abs(step);

      const distance = calculateDistance();

      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
      }
    }, speed);
  };

  return (
    <div className={className}>
      <div className="container--animeRow--anime">
        <h1>Anime {title}</h1>
        <div className="container--animeRow--anime--list" ref={animeRowRef}>
          {animes.length > 0 ? (
            animes.map((anime) => (
              <div className="itemes" key={anime.mal_id}>
                <Link to={`/anime-details/${anime.id}`}>
                  <img
                    src={anime.images.jpg.large_image_url}
                    alt={anime.title}
                  />
                </Link>
              </div>
            ))
          ) : (
            <p>Loading Anime List...</p>
          )}
        </div>

        <i
          className="fa-solid fa-angle-left"
          onClick={() => {
            sideScroll(animeRowRef.current, 10, -10, 1);
          }}
        ></i>
        <i
          className="fa-solid fa-angle-right"
          onClick={() => {
            sideScroll(animeRowRef.current, 10, 10, 1);
          }}
        ></i>
      </div>
      ;
    </div>
  );
}
AnimeRow.propTypes = {
  title: PropTypes.string.isRequired,
  fetchUrl: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired
};

export default styled(AnimeRow)`
  .container--animeRow--anime {
    max-width: 2200px;
    background: rgb(0, 0, 0);
    width: 100%;
    position: relative;
  }
  .container--animeRow--anime--list {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: calc((100% / 6));
    overflow: hidden;
  }
  .container--animeRow--anime--list .itemes {
    height: 340px;
    cursor: pointer;
    object-fit: cover;
  }
  .container--animeRow--anime--list .itemes img {
    border-radius: 5px;
    width: 100%;
    height: 340px;
    transform: scale(0.9);
    transition: all ease 0.2s;
  }
  .container--animeRow--anime--list .itemes img:hover {
    transform: scale(1);
  }
  .container--animeRow--anime i {
    color: #fff;
    background: #f7a6b9;
    height: 50px;
    width: 50px;
    text-align: center;
    line-height: 50px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    box-shadow: 0 3px 6px rgb(0, 0, 0.5);
    z-index: 1;
  }

  .container--animeRow--anime i:first-child {
    left: -15px;
  }
  .container--animeRow--anime i:last-child {
    right: -15px;
  }

  @media screen and (max-width: 1000px) {
    .container--animeRow--anime--list {
      grid-auto-columns: calc((100% / 4));
    }
  }
  @media screen and (max-width: 800px) {
    .container--animeRow--anime--list {
      grid-auto-columns: calc((100% / 3));
    }
  }
  @media screen and (max-width: 500px) {
    .container--animeRow--anime--list {
      grid-auto-columns: calc((100% / 2));
    }
  }
  @media screen and (max-width: 400px) {
    .container--animeRow--anime--list {
      grid-auto-columns: 100%;
    }
  }
`;
