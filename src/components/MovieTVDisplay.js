import React from "react";
import { apiKey } from "../apiKey.js";

import {
  baseUrl,
  baseImageUrlw200,
  baseImageUrlw500,
  moviesPlaying,
  moviesSearch,
  tvPopular,
  tvSearch,
  fetchOptions,
} from "../constants/constants";

import {
  Switch,
  Route,
  Link,
  NavLink,
  useRouteMatch,
  useParams,
} from "react-router-dom";

function MovieTVDisplay(props) {
  let { title } = useParams();
  const selectedTitle = props.selectedTitle;
  const genreList = props.genreList;
  console.log(props.selectedTitle);

  // function getGenreIDList() {
  //   fetch(
  //     `${baseUrl}genre/${props.mediaType}/list?api_key=${apiKey}&language=en-US`,
  //     fetchOptions
  //   )
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //     })
  //     .then((data) => {
  //       genreList = data;
  //       console.log(genreList)

  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  // getGenreIDList();

  const [titleGenres, setTitleGenres] = React.useState([]);

  function findGenreId() {
    console.log(selectedTitle.genre_ids);
    const titlegens = selectedTitle.genre_ids.map((genreId) => {
      console.log(genreList.genres);
      return genreList.genres.find((genre) => {
        if (genre.id === genreId) {
          return genre.name;
        }
      });
    });
    setTitleGenres(titlegens);
  }

  React.useEffect(() => {
    findGenreId();
  }, []);

  return (
    <div className="title-details">
      <div className="title-details__title-container">
        <h1 className="title-details__title">{selectedTitle.title}</h1>
        <p className="title-details__rating">{`${selectedTitle.vote_average}/10`}</p>
        <p className="title-details__rating-votes">{`${selectedTitle.vote_count} votes`}</p>
      </div>
      <div className="title-details__container">
        <img src={baseImageUrlw500 + selectedTitle["poster_path"]} alt="" />
        <div className="title-details__descriptors">
          <p className="title-details__release-date">
            {selectedTitle.release_date}
          </p>
          <p className="title-details__synopsis">{selectedTitle.overview}</p>
          <ul className="title-details__genres-list">
            {titleGenres.map((genre, index) => {
              return (
                <li key={index} className="title-details__genres-list_item">
                  {genre.name}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MovieTVDisplay;
