import React from "react";
import { useGlobalContext } from "../contex/global";

const GenreList = () => {
  const { animeGenres } = useGlobalContext();

  if (!animeGenres) {
    return <div>Loading genres...</div>;
  }

  return (
    <div>
      <h2>Anime Genres</h2>
      <ul>
        {animeGenres.map((genre) => (
          <li key={genre.mal_id}>{genre.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GenreList;
