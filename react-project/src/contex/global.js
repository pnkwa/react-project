import React, { createContext, useContext, useReducer } from "react";

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

//reducer
const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case GET_POPULAR_ANIME:
      return { ...state, popularAnime: action.payload, loading: false };
    case SEARCH:
      return { ...state, searchResults: action.payload, loading: false };
    case GET_UPCOMING_ANIME:
      return { ...state, upcomingAnime: action.payload, loading: false };
    case GET_AIRING_ANIME:
      return { ...state, airingAnime: action.payload, loading: false };
    case GET_PICTURES:
      return { ...state, pictures: action.payload, loading: false };
    case GET_ANIME_GENRES:
      return { ...state, animeGenres: action.payload, loading: false };
    case GET_ANIME_DETAILS:
      return { ...state, selectedAnime: action.payload, loading: false };
    case SET_SELECTED_GENRE:
      return { ...state, selectedGenre: action.payload };

    default:
      return state;
  }
};

export const GlobalContextProvider = ({ children }) => {
  //intial state
  const intialState = {
    popularAnime: [],
    upcomingAnime: [],
    airingAnime: [],
    pictures: [],
    isSearch: false,
    searchResults: [],
    loading: false,
    animeGenres: [], // Add animeGenres
    selectedGenre: null, // Add selectedGenre
  };

  const [state, dispatch] = useReducer(reducer, intialState);
  const [search, setSearch] = React.useState("");

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
  // Inside getPopularAnime function
  const getPopularAnime = async () => {
    dispatch({ type: LOADING });
    try {
      const response = await fetch(`${baseUrl}/top/anime?filter=bypopularity`);
      if (response.status === 429) {
        console.error("API rate limit exceeded");
        // Handle rate limit exceeded error, maybe use a timeout and retry
        return;
      }
      const data = await response.json();
      dispatch({ type: GET_POPULAR_ANIME, payload: data.data });
    } catch (error) {
      console.error("Error fetching popular anime:", error);
    }
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
      `https://api.jikan.moe/v4/anime?q=${anime}&order_by=popularity&sort=asc&sfw`
    );
    const data = await response.json();
    dispatch({ type: SEARCH, payload: data.data });
  };

  //get anime pictures
  const getAnimePictures = async (id) => {
    dispatch({ type: LOADING });
    const response = await fetch(
      `https://api.jikan.moe/v4/characters/${id}/pictures`
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




  //initial render
  React.useEffect(() => {
    getPopularAnime(); 
    getAnimeGenres(); // Fetch anime genres
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

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
