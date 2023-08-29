import React, { useState, useEffect } from "react";
import AnimeTable from "./AnimeTable";
import AnimeRow from "./AnimeRow";
import { useGlobalContext } from "../context/global";

function Genres({ title }) {

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
  console.log(title);

  <>
    <div className="container--animeRow">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <AnimeRow title={"Top 10" + title + " Hit"} animes={popularAnime} />
          <AnimeTable title={title} animes={popularAnime} />
        </>
      )}
    </div>
  </>;
}

export default Genres;
