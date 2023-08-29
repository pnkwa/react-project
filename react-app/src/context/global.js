import React, { createContext, useContext, useReducer } from "react";
import { useState, useEffect } from "react";
import reducer from "./reducer";

const GlobalContext = createContext();
const baseUrl = "https://api.jikan.moe/v4";

//actions
const LOADING = "LOADING";
const SEARCH = "SEARCH";
const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
const GET_AIRING_ANIME = "GET_AIRING_ANIME";
const GET_PICTURES = "GET_PICTURES";
const GET_ANIME_DETAILS = "GET_ANIME_DETAILS";
const GET_ANIME_GENRES = "GET_ANIME_GENRES";
const SET_SELECTED_GENRE = "SET_SELECTED_GENRE";
const GET_WINTER_ANIME = "GET_WINTER_ANIME";
const GET_SUMMER_ANIME = "GET_SUMMER_ANIME";
const GET_SPRING_ANIME = "GET_SPRING_ANIME";
const GET_FALL_ANIME = "GET_FALL_ANIME";

const GlobalContextProvider = ({ children }) => {
  //intial state
  const intialState = {
    popularAnime: [],
    upcomingAnime: [],
    airingAnime: [],
    winterAnime: [],
    summerAnime: [],
    springAnime: [],
    fallAnime: [],
    pictures: [],
    isSearch: false,
    searchResults: [],
    loading: false,
    animeGenres: [], // Add animeGenres
    selectedGenre: null, // Add selectedGenre
  };

  const [state, dispatch] = useReducer(reducer, intialState);
  const [search, setSearch] = useState("");

  //handle change
  const handleChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      state.isSearch = false;
    }
  };

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      searchAnime(search);
      state.isSearch = true;
    } else {
      state.isSearch = false;
      alert("Please enter a search term");
    }
  };

  //fetch popular anime
  const getPopularAnime = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseUrl}/top/anime?filter=bypopularity`);
    const data = await response.json();
    dispatch({ type: GET_POPULAR_ANIME, payload: data.data });
  };

  //fetch upcoming anime
  const getUpcomingAnime = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseUrl}/top/anime?filter=upcoming`);
    const data = await response.json();
    dispatch({ type: GET_UPCOMING_ANIME, payload: data.data });
  };

  //fetch airing anime
  const getAiringAnime = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseUrl}/top/anime?filter=airing`);
    const data = await response.json();
    dispatch({ type: GET_AIRING_ANIME, payload: data.data });
  };

  //search anime
  const searchAnime = async (anime) => {
    dispatch({ type: LOADING });
    const response = await fetch(
      `${baseUrl}/anime?q=${anime}&order_by=popularity&sort=asc&sfw`
    );
    const data = await response.json();
    dispatch({ type: SEARCH, payload: data.data });
  };

  //get anime pictures
  const getAnimePictures = async (id) => {
    dispatch({ type: LOADING });
    const response = await fetch(
      `${baseUrl}/characters/${id}/pictures`
    );
    const data = await response.json();
    dispatch({ type: GET_PICTURES, payload: data.data });
  };

  //fetch anime by genre https://api.jikan.moe/v4/genres/anime
  const getAnimeGenres = async () => {
    try {
      console.log("Fetching anime genres...");
      const response = await fetch(`${baseUrl}/genres/anime`);
      const data = await response.json();
      dispatch({ type: GET_ANIME_GENRES, payload: data.data });
      console.log("Anime genres fetched:", data.data);
    } catch (error) {
      console.error("Error fetching anime genres:", error);
    }
  };

  // Fetch anime details by ID
  const getAnimeDetails = async (id) => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseUrl}/anime/${id}`);
    const data = await response.json();
    dispatch({ type: GET_ANIME_DETAILS, payload: data });
  };

  // Action to set the selected genre
  const setSelectedGenre = (genreId) => {
    dispatch({ type: SET_SELECTED_GENRE, payload: genreId });
  };

  // Define the getAnimeNamesByGenre function
  // Inside your context file
  const getAnimeNamesByGenre = async (genreId) => {
    const genre = state.animeGenres.find((genre) => genre.mal_id === genreId);
    if (genre && genre.name) {
      return genre.name; // Return the genre name as a single string
    }
    return "";
  };

  // fetchWinterAnime: '/seasons/2022/winter'
  const getWinterAnime = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseUrl}/seasons/2022/winter`);
    const data = await response.json();
    dispatch({ type: GET_WINTER_ANIME, payload: data.data });
  };

  // fetchAutumnAnime: '/seasons/2022/spring'
  const getSpringAnime = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseUrl}/seasons/2022/spring`);
    const data = await response.json();
    dispatch({ type: GET_SPRING_ANIME, payload: data.data });
  };

  //fetchFallAnime:'/seasons/2022/Fall'
  const getFallAnime = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseUrl}/seasons/2022/fall`);
    const data = await response.json();
    dispatch({ type: GET_FALL_ANIME, payload: data.data });
  };

  // fetchSummerAnime:'/seasons/2022/summer'
  const getSummerAnime = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseUrl}/seasons/2022/summer`);
    const data = await response.json();
    dispatch({ type: GET_SUMMER_ANIME, payload: data.data });
  };

  // useEffect(() => {
  //   getPopularAnime();
  //   getUpcomingAnime();
  //   getAiringAnime();
  //   getWinterAnime();
  //   getSummerAnime();
  //   getSpringAnime();
  //   getFallAnime();
  // }, []);

  useEffect(() => {
    const delay = 1800; 

    const fetchWithDelay = async (fetchFunction) => {
      await new Promise((resolve) => setTimeout(resolve, delay));
      fetchFunction();
    };
    const fetchAllData = async () => {
      await fetchWithDelay(getPopularAnime);
      await fetchWithDelay(getUpcomingAnime);
      await fetchWithDelay(getAiringAnime);
      await fetchWithDelay(getWinterAnime);
      await fetchWithDelay(getSummerAnime);
      await fetchWithDelay(getSpringAnime);
      await fetchWithDelay(getFallAnime);
    };

    fetchAllData();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        handleChange,
        handleSubmit,
        searchAnime,
        search,
        getPopularAnime,
        getUpcomingAnime,
        getAiringAnime,
        getWinterAnime,
        getSummerAnime,
        getSpringAnime,
        getFallAnime,
        getAnimePictures,
        getAnimeGenres,
        getAnimeDetails,
        getAnimeNamesByGenre,
        setSelectedGenre, // Add this action to the value
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalContextProvider, useGlobalContext };
