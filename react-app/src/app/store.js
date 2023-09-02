import { configureStore } from "@reduxjs/toolkit";
import animeReducer from "../context/reducer";

export default configureStore({
  reducer: {
    anime: animeReducer,
  },
});
