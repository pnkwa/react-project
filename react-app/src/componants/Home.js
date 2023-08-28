import React, { useState, useEffect } from "react";
import requests from "../request";
import AnimeTable from "./AnimeTable";
import AnimeRow from "./AnimeRow"

function Home() {
  return (
    <>
      <div className="container--animeRow">
      <AnimeRow title='Top 10 Hit' fetchUrl={requests.fetchTopAnime} />
      {/* <AnimeRow title='Top Hit' fetchUrl={requests.fetchPopular} />
      <AnimeRow title='Now Airing' fetchUrl={requests.fetchTopAiring} />
      <AnimeTable  title='Fatasy' fetchUrl={requests.fetchAllTopAiring} />  */}
      </div>
    </>
  );
}
export default Home;