import React from "react";
import ReactDOM from "react-dom";

import {
  baseUrl,
  baseImageUrlw200,
  moviesPlaying,
  moviesSearch,
  tvPopular,
  tvSearch,
  fetchOptions,
} from "../constants/constants";
import noPosterFound from "../images/no-poster-found.png";

import MovieTVCard from "./MovieTVCard";
import MovieTVListContext from "../contexts/MovieTVListContext";

function TVList(props) {
  const movieTVListResults = React.useContext(MovieTVListContext);

  React.useEffect(() => {
    props.onLoad();
  }, []);

  return (
    <ul className="cards-list">
      {movieTVListResults.results.map((result, index) => {
        return (
          <MovieTVCard
            key={index}
            src={
              result["poster_path"] !== null
                ? baseImageUrlw200 + result["poster_path"]
                : noPosterFound
            }
            title={result.name}
          />
        );
      })}
    </ul>
  );
}

export default TVList;
