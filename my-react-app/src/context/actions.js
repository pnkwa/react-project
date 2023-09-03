import { createAction } from "@reduxjs/toolkit";

//actions
export const loadingAction = createAction("LOADING");
export const searchAction = createAction("SEARCH");
export const popularAction = createAction("GET_POPULAR_ANIME");
export const upComingAction = createAction("GET_UPCOMING_ANIME");
export const airingAction = createAction("GET_AIRING_ANIME");
export const winterAction = createAction("GET_WINTER_ANIME");
export const summerAction = createAction("GET_SUMMER_ANIME");
export const springAction = createAction("GET_SPRING_ANIME");
export const fallAction = createAction("GET_FALL_ANIME");
export const nowAction = createAction("GET_NOW_ANIME");
export const isSearchAction = createAction("GET_IS_SEARCH");