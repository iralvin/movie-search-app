import React from "react";
import ReactDOM from "react-dom";
import {
  Switch,
  Route,
  Link,
  NavLink,
  useRouteMatch,
  withRouter,
  useLocation,
  useParams,
} from "react-router-dom";

import {
  baseUrl,
  baseImageUrlw200,
  moviesPlaying,
  moviesSearch,
  tvPopular,
  tvSearch,
  fetchOptions,
} from "../constants/constants";

function SearchForm(props) {
  const { pathname } = useLocation();
  const { path } = useRouteMatch();
  const searchForm = React.useRef();
  const searchInput = React.useRef();

  function handleOnSubmit(e) {
    e.preventDefault();
    if (searchInput.current.value !== "") {
      props.onSearchQueryChange(searchInput.current.value);
      props.onListChange(
        props.currentListToGet === moviesPlaying ||
          props.currentListToGet === moviesSearch
          ? moviesSearch
          : tvSearch
      );
      // console.log(props.history);
      // console.log(pathname);
      // console.log(path);
      props.history.push(
        `${
          props.currentListToGet === moviesPlaying ||
          props.currentListToGet === moviesSearch
            ? "/movie"
            : "/tv"
        }/search/${searchInput.current.value}`
      );
      // searchForm.current.reset();
    } else {
      console.log("enter search query");
    }
  }

  return (
    <form ref={searchForm} onSubmit={handleOnSubmit}>
      <label>enter search query</label>
      <input
        ref={searchInput}
        onFocus={() => {
          searchForm.current.reset();
        }}
      />
      <button type="submit">search</button>
    </form>
  );
}

export default withRouter(SearchForm);
