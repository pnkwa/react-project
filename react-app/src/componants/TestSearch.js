import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/global";
import styled from "styled-components";

function TestSearch() {
  const { searchResults, isSearch, popularAnime } = useGlobalContext();

  const conditionalRender = () => {
    if (!isSearch) {
      return popularAnime.map((anime) => {
        return (
          <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
            <img src={anime.images.jpg.large_image_url} alt="" />
          </Link>
        );
      });
    }
    return searchResults.map((anime) => {
      return (
        <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
          <img src={anime.images.jpg.large_image_url} alt={anime.title} />
        </Link>
      );
    });
  };

  return (
    <PopularStyled>
      {/* <div className="hero--image"></div> */}
      <div className="popular-anime">
        {/* render function */}
        {conditionalRender()}
      </div>
    </PopularStyled>
  );
}

const PopularStyled = styled.div`

  .popular-anime {
    margin-top: 3rem;
    padding: 2rem 5rem 2rem 5rem;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(205px, 1fr));
    grid-gap: 1rem;
    background-color: rgb(22, 22, 22);
    background: linear-gradient(to top, #f7a6b9 -20%, black 50%);
    
    a {
      height: 340px;
      width: 100%;
      border-radius: 5px;
    }
    a img {
      width: 100%;
      height: 340px;
      object-fit: cover;
      border-radius: 5px;
      transform: scale(0.9);
      transition: 0.3s;
    }
    a img:hover {
      transform: scale(1);
    }
  }
`;

export default TestSearch;