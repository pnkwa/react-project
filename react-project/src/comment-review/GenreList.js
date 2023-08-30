import React from "react";
import { useGlobalContext } from "../contex/global";

const GenreList = () => {
  const {
    animeGenres,
    setSelectedGenre,
    selectedGenre,
    getAnimeNamesByGenre,
    popularAnime,
  } = useGlobalContext();

  if (!animeGenres) {
    return <div>Loading genres...</div>;
  }

  console.log("animeGenres:", animeGenres);
  console.log("selectedGenre:", selectedGenre);
  console.log("popularAnime:", popularAnime);

  return (
    <div>
      <h2>Anime Genres</h2>
      <ul>
        {animeGenres.map((genre) => (
          <li
            key={genre.mal_id}
            onClick={() => setSelectedGenre(genre.mal_id)}
            style={{
              fontWeight: selectedGenre === genre.mal_id ? "bold" : "normal",
              cursor: "pointer",
            }}
          >
            {genre.name}
          </li>
        ))}
      </ul>

      {selectedGenre && popularAnime && popularAnime.length > 0 && (
        <div>
          <h3>
            Selected Genre:{" "}
            {animeGenres.find((g) => g.mal_id === selectedGenre)?.name}
          </h3>
          <ul>
            {popularAnime
              .filter(async (anime) => {
                const genreName = await getAnimeNamesByGenre(selectedGenre);
                console.log("Genre Name:", genreName);
                console.log("Anime Genres:", anime.genres);
                const lowerCaseGenreName = genreName.toLowerCase();
                const hasGenre = anime.genres.some(
                  (genre) => genre.name.toLowerCase() === lowerCaseGenreName
                );
                console.log("Has Genre:", hasGenre);
                return hasGenre;
              })
              .map((anime) => (
                <li key={anime.mal_id}>{anime.title}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GenreList;
