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
  const [titleDetails, setTitleDetails] = React.useState({});
  const [titleCredits, setTitleCredits] = React.useState({});
  let { media, title, id } = useParams();

  function getTitleDetails() {
    fetch(
      `${baseUrl}${media}/${id}?api_key=${apiKey}&language=en-US`,
      fetchOptions
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setTitleDetails(data);
      });
  }

  function getTitleCredits() {
    fetch(
      `${baseUrl}${media}/${id}/credits?api_key=${apiKey}&language=en-US`,
      fetchOptions
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setTitleCredits(data);
      });
  }

  React.useEffect(() => {
    getTitleDetails();
    getTitleCredits();
  }, []);

  // React.useEffect(() => {
  //   console.log(titleCredits.cast);
  //   function listCredits() {
  //     if (titleCredits.cast) {
  //       const creditsList = titleCredits.cast.filter((item, index) => {
  //         if (item.order < 6) {
  //           return item;
  //         }
  //       });
  //       console.log(creditsList);
  //     }
  //   }

  //   listCredits();
  // }, [titleCredits]);

  return (
    <div className="title-details">
      <div className="title-details__title-container">
        <h1 className="title-details__title">
          {titleDetails.title || titleDetails.name}
        </h1>
        <p className="title-details__rating">{`${titleDetails.vote_average}/10`}</p>
        <p className="title-details__rating-votes">{`${titleDetails.vote_count} votes`}</p>
      </div>
      <div className="title-details__container">
        <img src={baseImageUrlw500 + titleDetails["poster_path"]} alt="" />
        <div className="title-details__descriptors">
          <p className="title-details__release-date">
            {titleDetails.release_date}
          </p>
          <p className="title-details__synopsis">{titleDetails.overview}</p>
          <ul className="title-details__genres-list">
            {titleDetails.genres &&
              titleDetails.genres.map((genre, index) => {
                return (
                  <li key={index} className="title-details__genres-list_item">
                    {genre.name}
                  </li>
                );
              })}
          </ul>

          <ul className="title-details__credits-list">
            {titleCredits.cast &&
              titleCredits.cast.map((item, index) => {
                if (item.order < 9) {
                  return (
                    <li
                      key={index}
                      className="title-details__credits-list_item"
                    >
                      {`${item.name}: ${item.character}`}
                    </li>
                  );
                }
              })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MovieTVDisplay;
