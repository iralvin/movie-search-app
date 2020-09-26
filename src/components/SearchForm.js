import React from "react";
import ReactDOM from "react-dom";

import {
  baseUrl,
  baseImageUrl,
  moviesPlaying,
  moviesSearch,
  tvPopular,
  tvSearch,
  fetchOptions,
} from "../constants/constants";

function SearchForm(props) {
  const searchForm = React.useRef();
  const searchInput = React.useRef();

  function handleOnSubmit(e) {
    e.preventDefault();
    props.onSearchQueryChange(searchInput.current.value);
    props.onListChange(
      props.currentListToGet === moviesPlaying ? moviesSearch : tvSearch
    );

    searchForm.current.reset();
  }

  return (
    <form ref={searchForm}>
      <label>enter search query</label>
      <input ref={searchInput} />
      <button type="submit" onClick={handleOnSubmit}>
        search
      </button>
    </form>
  );
}

export default SearchForm;
