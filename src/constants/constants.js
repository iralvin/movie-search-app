import { apiKey } from "../apiKey.js";

export const baseUrl = "https://api.themoviedb.org/3/";
export const baseImageUrlw200 = "http://image.tmdb.org/t/p/w200";
export const baseImageUrlw500 = "http://image.tmdb.org/t/p/w500";

export const moviesPlaying = "movie/now_playing";
export const moviesSearch = "search/movie";
export const moviesDiscover = "discover/movie"

export const tvPopular = "tv/popular";
export const tvSearch = "search/tv";
export const tvDiscover = "discover/tv"

export const fetchOptions = {
  method: "GET",
  headers: {
    "Content-type": "application/json",
    authorization: apiKey,
  },
};

