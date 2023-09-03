import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

function AnimeTable({ title, animes, className }) {
  const [displayedAnimes, setDisplayedAnimes] = useState([]);
  useEffect(() => {
    if (animes) {
      setDisplayedAnimes(animes); 
    }
  }, [animes]);


  return (
    <div className={className}>
      <div className="container--animeRow--anime">
        <h1>Anime {title}</h1>
        <div className="container--animeRow--anime--all--list">
          {displayedAnimes.length > 0 ? (
            displayedAnimes.map((anime) => (
              <div className="itemes" key={anime.mal_id}>
                <Link to={`/anime/${anime.mal_id}`}>
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
      </div>
    </div>
  );
}

AnimeTable.propTypes = {
  title: PropTypes.string.isRequired,
  animes: PropTypes.array.isRequired,
  className: PropTypes.string.isRequired,
};

export default styled(AnimeTable)`
  .container--animeRow--anime {
    max-width: 2200px;
    background: rgb(0, 0, 0);
    width: 100%;
    position: relative;
  }
  .container--animeRow--anime--all--list {
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: repeat(auto-fill, minmax(calc(100% / 6), 1fr));
  }

  .container--animeRow--anime--all--list .itemes {
    height: 340px;
    cursor: pointer;
    object-fit: cover;
  }

  .container--animeRow--anime--all--list .itemes img {
    border-radius: 5px;
    width: 100%;
    height: 340px;
    transform: scale(0.9);
    transition: all ease 0.2s;
    /* object-fit: cover;*/
  }
  .container--animeRow--anime--all--list .itemes img:hover {
    transform: scale(1);
  }
  /*animerow all lis resposive*/
  @media screen and (max-width: 1000px) {
    .container--animeRow--anime--all--list {
      grid-template-columns: repeat(auto-fill, minmax(calc(100% / 4), 1fr));
    }
  }
  @media screen and (max-width: 800px) {
    .container--animeRow--anime--all--list {
      grid-template-columns: repeat(auto-fill, minmax(calc(100% / 3), 1fr));
    }
  }
  @media screen and (max-width: 500px) {
    .container--animeRow--anime--all--list {
      grid-template-columns: repeat(auto-fill, minmax(calc(100% / 2), 1fr));
    }
  }
  @media screen and (max-width: 400px) {
    .container--animeRow--anime--all--list {
      grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
    }
  }
`;