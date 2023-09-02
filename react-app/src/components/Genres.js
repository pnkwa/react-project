import React from "react";
import AnimeTable from "./showAnime/AnimeTable";
import AnimeRow from "./showAnime/AnimeRow";
import { useGlobalContext } from "../context/global";
import { useParams } from "react-router-dom";
import { getGenreFromId } from "../context/genresCase";
import NotFound from "./NotFound";

function Genres() {
  const { genreId } = useParams();
  const { nowAnime, loading, popularAnime, summerAnime } = useGlobalContext();

  const genre = getGenreFromId(genreId);
  function filterAnimeByGenre(animeArray, genre) {
    return animeArray.filter((anime) =>
      anime.genres.some((animeGenres) => animeGenres.name === genre)
    );
  }
  const filteredNowAnime = filterAnimeByGenre(nowAnime, genre);
  const filteredPopularAnime = filterAnimeByGenre(popularAnime, genre);
  const filteredSummerAnime = filterAnimeByGenre(summerAnime, genre);
  const filteredAnimes = [
    ...filteredNowAnime,
    ...filteredPopularAnime,
    ...filteredSummerAnime,
  ];
  console.log(filteredAnimes);

  return (
    <div className="container--animeRow">
      {loading ? (
        <p>Loading...</p>
      ) : filteredAnimes.length > 0 ? (
        <>
          {filteredAnimes.length <= 6 ? (
            <AnimeTable title={genre} animes={filteredAnimes} />
          ) : (
            <>
              <AnimeRow title={`Top 10 ${genre} Hit`} animes={filteredAnimes} />
              <AnimeTable title={genre} animes={filteredAnimes} />
            </>
          )}
        </>
      ) : (
        <NotFound />
      )}
    </div>
  );
}

export default Genres;
