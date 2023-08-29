import React, { useEffect, useState } from "react";
import AnimeTable from "./AnimeTable";
import AnimeRow from "./AnimeRow";
import { useGlobalContext } from "../context/global";


function Genres({ selectedGenre }) {
    const { nowAnime, loading } = useGlobalContext();
  
    const filteredAnimes = nowAnime.filter(anime =>
      anime.genres.some(animeGenres => animeGenres.name === selectedGenre)
    );
  
    return (
      <div className="container--animeRow">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <AnimeRow title={`Top 10 ${selectedGenre} Hit`} animes={filteredAnimes} />
            <AnimeTable title={selectedGenre} animes={filteredAnimes} />
          </>
        )}
      </div>
    );
  }
  
  export default Genres;


// import { useParams } from 'react-router-dom';

// function Genres() {
//   const { genre } = useParams();
//   const { nowAnime, loading } = useGlobalContext();

//   const filteredAnimes = nowAnime.filter(anime =>
//     anime.genres.some(genreObj => genreObj.name === genre)
//   );

//   return (
//     <div className="container--animeRow">
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//           <AnimeRow title={`Top 10 ${genre} Hit`} animes={filteredAnimes} />
//           <AnimeTable title={genre} animes={filteredAnimes} />
//         </>
//       )}
//     </div>
//   );
// }

// export default Genres;
