import React, { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import animeReducer from "./reducer";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  loadingAction,
  searchAction,
  popularAction,
  upComingAction,
  airingAction,
  animeDetailsAction,
  winterAction,
  summerAction,
  springAction,
  fallAction,
  nowAction,
} from "./actions";

const GlobalContext = createContext();
const baseUrl = "https://api.jikan.moe/v4";

// //actions
// const LOADING = "LOADING";
// const SEARCH = "SEARCH";
// const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
// const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
// const GET_AIRING_ANIME = "GET_AIRING_ANIME";
// const GET_ANIME_DETAILS = "GET_ANIME_DETAILS";
// const GET_WINTER_ANIME = "GET_WINTER_ANIME";
// const GET_SUMMER_ANIME = "GET_SUMMER_ANIME";
// const GET_SPRING_ANIME = "GET_SPRING_ANIME";
// const GET_FALL_ANIME = "GET_FALL_ANIME";
// const GET_NOW_ANIME = "GET_NOW_ANIME";

const GlobalContextProvider = ({ children }) => {
  const loading = useSelector((state) => state.anime.loading);
  const searchInfo = useSelector((state) => state.anime.isSearch);
  const popularAnime = useSelector((state) => state.anime.popularAnime);
  const upcomingAnime = useSelector((state) => state.anime.upcomingAnime);
  const airingAnime = useSelector((state) => state.anime.airingAnime);
  const winterAnime = useSelector((state) => state.anime.winterAnime);
  const summerAnime = useSelector((state) => state.anime.summerAnime);
  const springAnime = useSelector((state) => state.anime.springAnime);
  const fallAnime = useSelector((state) => state.anime.fallAnime);
  const nowAnime = useSelector((state) => state.anime.nowAnime);
  const animeDetails = useSelector((state) => state.anime.animeDetails);
  //intial state
  // const intialState = {
  //   popularAnime: [],
  //   upcomingAnime: [],
  //   airingAnime: [],
  //   winterAnime: [],
  //   summerAnime: [],
  //   springAnime: [],
  //   fallAnime: [],
  //   nowAnime: [],
  //   animeDetails: [],
  const isSearch = false;
  //   searchResults: [],
  //   loading: false,
  // };
  const dispatch = useDispatch();
  // const animes = useSelector((state) => state.anime);
  const [state] = useState("");
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
    dispatch(loadingAction);
    const response = await axios.get(`${baseUrl}/top/anime?limit=10`); // <-- change Fetch to axios
    console.log(response);
    //dispatch({ type: GET_POPULAR_ANIME, payload: response.data.data }); //<-- add more .data
    dispatch(popularAction(response.data.data));
  };

  //fetch upcoming anime
  const getUpcomingAnime = async () => {
    dispatch(loadingAction);
    const response = await axios.get(
      `${baseUrl}/top/anime?filter=upcoming&limit=10`
    );
    dispatch(upComingAction(response.data.data));
  };

  //fetch airing anime
  const getAiringAnime = async () => {
    dispatch(loadingAction);
    const response = await axios.get(
      `${baseUrl}/top/anime?filter=airing&limit=10`
    );
    dispatch(airingAction(response.data.data));
  };

  //search anime
  const searchAnime = async (anime) => {
    dispatch(loadingAction);
    const response = await axios.get(
      `${baseUrl}/anime?q=${anime}&order_by=popularity&sort=asc&sfw`
    );
    dispatch(searchAction(response.data.data));
  };

  // Fetch anime details by ID
  const getAnimeDetails = async (id) => {
    dispatch(loadingAction);
    const response = await axios.get(`${baseUrl}/anime/${id}/full`);
    dispatch(animeDetailsAction(response.data.data));
  };

  // fetchWinterAnime: '/seasons/2022/winter'
  const getWinterAnime = async () => {
    dispatch(loadingAction);
    const response = await axios.get(`${baseUrl}/seasons/2022/winter?limit=10`);
    dispatch(winterAction(response.data.data));
  };

  // fetchAutumnAnime: '/seasons/2022/spring'
  const getSpringAnime = async () => {
    dispatch(loadingAction);
    const response = await axios.get(`${baseUrl}/seasons/2022/spring?limit=10`);
    dispatch(springAction(response.data.data));
  };

  //fetchFallAnime:'/seasons/2022/Fall'
  const getFallAnime = async () => {
    dispatch(loadingAction);
    const response = await axios.get(`${baseUrl}/seasons/2022/fall?limit=10`);
    dispatch(fallAction(response.data.data));
  };

  // fetchSummerAnime:'/seasons/2022/summer'
  const getSummerAnime = async () => {
    dispatch(loadingAction);
    const response = await axios.get(`${baseUrl}/seasons/2022/summer?limit=10`);
    dispatch(summerAction(response.data.data));
  };

  // fetchNowSeason, 2 page:/seasons/now?type=anime&page=
  const getNowAnime = async () => {
    dispatch(loadingAction);
    let currentPage = 1;
    let allData = [];

    const fetchPageData = async (page) => {
      const response = await axios.get(
        `${baseUrl}/seasons/now?type=anime&page=${page}`
      );
      return response.data.data;
    };

    const fetchWithDelay = async () => {
      if (currentPage <= 2) {
        const pageData = await fetchPageData(currentPage);
        const animeArray = Object.values(pageData);
        allData = [...allData, ...animeArray];
        console.log(allData);
        dispatch(nowAction(allData));

        if (currentPage < 2) {
          currentPage++;
          setTimeout(fetchWithDelay, 2000);
        }
      }
    };
    fetchWithDelay();
  };

  useEffect(() => {
    const delay = 2000;

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
      await fetchWithDelay(getNowAnime);
    };

    fetchAllData();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        popularAnime,
        upcomingAnime,
        airingAnime,
        loading,
        winterAnime,
        summerAnime,
        springAnime,
        fallAnime,
        nowAnime,
        animeDetails,
        handleChange,
        handleSubmit,
        searchAnime,
        search,
        searchInfo,
        // getPopularAnime,
        // getUpcomingAnime,
        // getAiringAnime,
        // getWinterAnime,
        // getSummerAnime,
        // getSpringAnime,
        // getFallAnime,
        getNowAnime,
        getAnimeDetails,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(GlobalContext);
};

GlobalContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export { GlobalContextProvider, useGlobalContext };
