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
    case GET_WINTER_ANIME:
      return { ...state, winterAnime: action.payload, loading: false };
    case GET_SUMMER_ANIME:
      return { ...state, summerAnime: action.payload, loading: false };
    case GET_SPRING_ANIME:
      return { ...state, springAnime: action.payload, loading: false };
    case GET_FALL_ANIME:
      return { ...state, fallAnime: action.payload, loading: false };
    case GET_ANIME_DETAILS:
      return { ...state, animeDetails: action.payload, loading: false };
    case GET_NOW_ANIME:
      return { ...state, nowAnime: action.payload, loading: false };

    default:
      return state;
  }
};

//actions
const LOADING = "LOADING";
const SEARCH = "SEARCH";
const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
const GET_AIRING_ANIME = "GET_AIRING_ANIME";
const GET_ANIME_DETAILS = "GET_ANIME_DETAILS";
const GET_WINTER_ANIME = "GET_WINTER_ANIME";
const GET_SUMMER_ANIME = "GET_SUMMER_ANIME";
const GET_SPRING_ANIME = "GET_SPRING_ANIME";
const GET_FALL_ANIME = "GET_FALL_ANIME";
const GET_NOW_ANIME = "GET_NOW_ANIME";

export default reducer;
