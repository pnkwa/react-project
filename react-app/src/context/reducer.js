import { createReducer } from "@reduxjs/toolkit";

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

const initialState = {
  popularAnime: [],
  upcomingAnime: [],
  airingAnime: [],
  winterAnime: [],
  summerAnime: [],
  springAnime: [],
  fallAnime: [],
  nowAnime: [],
  isSearch: false,
  searchResults: [],
  loading: false,
};

const animeReducer = createReducer(initialState, {
  [loadingAction]: (state) => {
    state.loading = true;
  },
  [searchAction]: (state, action) => {
    state.searchResults = action.payload;
    state.loading = false;
    console.log(state.searchResults);
  },
  [popularAction]: (state, action) => {
    state.popularAnime = action.payload;
    state.loading = false;
  },
  [upComingAction]: (state, action) => {
    state.upcomingAnime = action.payload;
    state.loading = false;
  },
  [airingAction]: (state, action) => {
    state.airingAnime = action.payload;
    state.loading = false;
  },
  [winterAction]: (state, action) => {
    state.winterAnime = action.payload;
    state.loading = false;
  },
  [summerAction]: (state, action) => {
    state.summerAnime = action.payload;
    state.loading = false;
  },
  [springAction]: (state, action) => {
    state.springAnime = action.payload;
    state.loading = false;
  },
  [fallAction]: (state, action) => {
    state.fallAnime = action.payload;
    state.loading = false;
  },
  [nowAction]: (state, action) => {
    state.nowAnime = action.payload;
    state.loading = false;
  },
  [isSearchAction]: (state, action) => {
    state.isSearch = action.payload;
    state.loading = false;
  },
});

export default animeReducer;
