import React from "react";
import AnimeRow from "./showAnime/AnimeRow";
import { useGlobalContext } from "../context/global";

function Home() {
  const {
    popularAnime,
    upcomingAnime,
    airingAnime,
    winterAnime,
    summerAnime,
    springAnime,
    fallAnime,
    loading,
  } = useGlobalContext();

  const animeHome = [
    { title: "Top 10 Hit", animes: popularAnime },
    { title: "Now Airing", animes: airingAnime },
    { title: "Upcoming", animes: upcomingAnime },
    { title: "Top 2022 Winter", animes: winterAnime },
    { title: "Top 2022 Summer", animes: summerAnime },
    { title: "Top 2022 Spring", animes: springAnime },
    { title: "Top 2022 Fall", animes: fallAnime },
  ];

  return (
    <>
      <div className="container--animeRow">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {animeHome.map((row, index) => (
              <AnimeRow key={index} title={row.title} animes={row.animes} />
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default Home;