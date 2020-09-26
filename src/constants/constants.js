import { apiKey } from "../apiKey.js";

export const baseUrl = "https://api.themoviedb.org/3/";
export const baseImageUrl = "http://image.tmdb.org/t/p/w200";

export const moviesPlaying = "movie/now_playing";
export const moviesSearch = "search/movie";
export const tvPopular = "tv/popular";
export const tvSearch = "search/tv";

export const fetchOptions = {
  method: "GET",
  headers: {
    "Content-type": "application/json",
    authorization: apiKey,
  },
};

