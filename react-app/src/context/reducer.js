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

export default reducer;
