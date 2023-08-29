import React, { useState, useEffect } from "react";
import AnimeRow from "./AnimeRow";
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

  return (
    <>
      <div className="container--animeRow">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <AnimeRow title="Top 10 Hit" animes={popularAnime} />
            <AnimeRow title="Now Airing" animes={airingAnime} />
            <AnimeRow title="Upcoming" animes={upcomingAnime} />
            <AnimeRow title="Top 2022 Winter" animes={winterAnime} />
            <AnimeRow title="Top 2022 Summer" animes={summerAnime} />
            <AnimeRow title="Top 2022 Spring" animes={springAnime} />
            <AnimeRow title="Top 2022 Fall" animes={fallAnime} />
          </>
        )}
      </div>
    </>
  );
}
export default Home;
