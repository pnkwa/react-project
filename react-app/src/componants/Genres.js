import React, { useState, useEffect } from "react";
import AnimeTable from "./AnimeTable";
import AnimeRow from "./AnimeRow";
import { useGlobalContext } from "../context/global";
import { useParams } from "react-router-dom";

function Genres() {
  const [title, setTitle] = useState("");

  const { genre } = useParams();

  useEffect(() => {
    setTitle(genre);
  }, [genre]);
  console.log(genre);

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
