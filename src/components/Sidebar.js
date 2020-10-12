import React from "react";
import ReactDOM from "react-dom";
import GenreContext from "../contexts/GenreContext";

import {
  baseUrl,
  baseImageUrlw200,
  moviesPlaying,
  moviesSearch,
  moviesDiscover,
  tvPopular,
  tvSearch,
  tvDiscover,
  fetchOptions,
} from "../constants/constants";

function Sidebar(props) {
  const genreList = React.useContext(GenreContext);


  function handleOnClick(genreId) {
    props.handleGenreIdSearch(genreId)
    props.handleListToGet(props.genreListType === "movie" ? moviesDiscover : tvDiscover)
    // console.log("clicked genre " + genre.name)
  }




  return (
    <div className="sidebar">
      <ul className="sidebar__nav-menu">
        {genreList.genres.map((genre, index) => {
          return (
            <li className="sidebar__nav-menu_nav-option" 
              key={index}
              onClick={() => {
                handleOnClick(genre.id);

              }}
            >
              {genre.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
