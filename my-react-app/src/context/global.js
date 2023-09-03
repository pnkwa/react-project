import React, { createContext, useContext} from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  loadingAction,
  searchAction,
  popularAction,
  upComingAction,
  airingAction,
  winterAction,
  summerAction,
  springAction,
  fallAction,
  nowAction,
  isSearchAction,
} from "./actions";

const GlobalContext = createContext();
const baseUrl = "https://api.jikan.moe/v4";

const GlobalContextProvider = ({ children }) => {
  const loading = useSelector((state) => state.anime.loading);
  const isSearch = useSelector((state) => state.anime.isSearch);
  const popularAnime = useSelector((state) => state.anime.popularAnime);
  const upcomingAnime = useSelector((state) => state.anime.upcomingAnime);
  const airingAnime = useSelector((state) => state.anime.airingAnime);
  const winterAnime = useSelector((state) => state.anime.winterAnime);
  const summerAnime = useSelector((state) => state.anime.summerAnime);
  const springAnime = useSelector((state) => state.anime.springAnime);
  const fallAnime = useSelector((state) => state.anime.fallAnime);
  const nowAnime = useSelector((state) => state.anime.nowAnime);
  const searchResults = useSelector((state) => state.anime.searchResults);

  const dispatchAnime = useDispatch();

  const [search, setSearch] = useState("");

  //handle change
  const handleChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      dispatchAnime(isSearchAction(false));
    }
  };

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      searchAnime(search);
      dispatchAnime(isSearchAction(true));
    } else {
      dispatchAnime(isSearchAction(false));
      alert("Please enter a search term");
    }
  };

  //fetch popular anime
  const getPopularAnime = async () => {
    dispatchAnime(loadingAction);
    const response = await axios.get(`${baseUrl}/top/anime?limit=10`); 
    console.log(response);
    dispatchAnime(popularAction(response.data.data));
  };

  //fetch upcoming anime
  const getUpcomingAnime = async () => {
    dispatchAnime(loadingAction);
    const response = await axios.get(
      `${baseUrl}/top/anime?filter=upcoming&limit=10`
    );
    dispatchAnime(upComingAction(response.data.data));
  };

  //fetch airing anime
  const getAiringAnime = async () => {
    dispatchAnime(loadingAction);
    const response = await axios.get(
      `${baseUrl}/top/anime?filter=airing&limit=10`
    );
    dispatchAnime(airingAction(response.data.data));
  };

  //search anime
  const searchAnime = async (anime) => {
    dispatchAnime(loadingAction);
    const response = await axios.get(
      `${baseUrl}/anime?q=${anime}&order_by=popularity&sort=asc&sfw`
    );
    dispatchAnime(searchAction(response.data.data));
  };

  // fetchWinterAnime: '/seasons/2022/winter'
  const getWinterAnime = async () => {
    dispatchAnime(loadingAction);
    const response = await axios.get(`${baseUrl}/seasons/2022/winter?limit=10`);
    dispatchAnime(winterAction(response.data.data));
  };

  // fetchAutumnAnime: '/seasons/2022/spring'
  const getSpringAnime = async () => {
    dispatchAnime(loadingAction);
    const response = await axios.get(`${baseUrl}/seasons/2022/spring?limit=10`);
    dispatchAnime(springAction(response.data.data));
  };

  //fetchFallAnime:'/seasons/2022/Fall'
  const getFallAnime = async () => {
    dispatchAnime(loadingAction);
    const response = await axios.get(`${baseUrl}/seasons/2022/fall?limit=10`);
    dispatchAnime(fallAction(response.data.data));
  };

  // fetchSummerAnime:'/seasons/2022/summer'
  const getSummerAnime = async () => {
    dispatchAnime(loadingAction);
    const response = await axios.get(`${baseUrl}/seasons/2022/summer?limit=10`);
    dispatchAnime(summerAction(response.data.data));
  };

  // fetchnowAnime:'/seasons/now?type=anime&page=1'
  const getNowAnime = async () => {
    dispatchAnime(loadingAction);
    const response = await axios.get(`${baseUrl}/seasons/now?type=anime&page=1`);
    dispatchAnime(nowAction(response.data.data));
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
        popularAnime,
        upcomingAnime,
        airingAnime,
        loading,
        winterAnime,
        summerAnime,
        springAnime,
        fallAnime,
        nowAnime,
        handleChange,
        handleSubmit,
        isSearch,
        searchResults,
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