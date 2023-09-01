import React from "react";
import AnimeTable from "./showAnime/AnimeTable";
import AnimeRow from "./showAnime/AnimeRow";
import { useGlobalContext } from "../context/global";
import { useParams } from "react-router-dom";
import { getGenreFromId } from "./genresCase";

function Genres() {
  const { genreId } = useParams();
  const { nowAnime, loading } = useGlobalContext();

  const genre = getGenreFromId(genreId);
  const filteredAnimes = nowAnime.filter((anime) =>
    anime.genres.some((animeGenres) => animeGenres.name === genre)
  );

  return (
    <div className="container--animeRow">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <AnimeRow title={`Top 10 ${genre} Hit`} animes={filteredAnimes} />
          <AnimeTable title={genre} animes={filteredAnimes} />
        </>
      )}
    </div>
  );
}

export default Genres;