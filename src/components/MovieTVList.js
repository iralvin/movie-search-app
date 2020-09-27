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

function MovieTVList(props) {
  const movieTVListResults = React.useContext(MovieTVListContext);

  React.useEffect(() => {
    console.log("has loaded ")
    props.onLoad();
  }, [props.listToGet]);

  return (
    <ul className="cards-list">
      {movieTVListResults.results.map((result, index) => {
        return (
          <MovieTVCard
          onCardClick={(selectedTitle)=> props.onCardClick(selectedTitle)}
            cardDetails={result}
            key={index}
            src={
              result["poster_path"] !== null
                ? baseImageUrlw200 + result["poster_path"]
                : noPosterFound
            }
            title={result.title || result.name}
          />
        );
      })}
    </ul>
  );
}

export default MovieTVList;
