import React from "react";

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
  let selectedTitle = props.selectedTitle;
  console.log(props.selectedTitle);

  // let selectedTitle;
  // React.useEffect(() => {
  //     selectedTitle = props.selectedTitle;
  //     console.log(selectedTitle)
  // },[props.selectedTitle])

  return (
    <div className="title-details-container">
      <h1>{`${selectedTitle.title}`}</h1>
      <img src={baseImageUrlw500+selectedTitle["poster_path"]} alt=""/>
      div.
    </div>
  );
}

export default MovieTVDisplay;
