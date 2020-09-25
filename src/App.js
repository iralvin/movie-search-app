import React from "react";
import "./App.css";

import { apiKey } from "./apiKey.js";

import Sidebar from "./Sidebar";
import MovieCard from "./MovieCard";
import noPostFound from "./no-poster-found.png";
import logo from "./movie-logo.png";

function App() {
  const [genreList, setGenreList] = React.useState({
    genres: [],
  });

  const [movieTVListResults, setMovieTVListResults] = React.useState({
    results: [],
  });

  const [tvListResults, setTVListResults] = React.useState({
    results: [],
  });

  const [listType, setListType] = React.useState("movie");                // movie.........search...tv........search
  const [listCategory, setListCategory] = React.useState("now_playing");  // now_playing...movie....popular...tv
  
  
  const [genreListType, setGenreListType] = React.useState("movie");      // movie.....tvlist
  const [searchQuery, setSearchQuery] = React.useState("");
  const [pageNumber, setPageNumber] = React.useState(1);

  const baseUrl = "https://api.themoviedb.org/3/";
  const baseImageUrl = "http://image.tmdb.org/t/p/w200";

  const moviesPlaying = "movie/now_playing";
  const moviesSearch = "search/movie";
  const tvPopular = "tv/popular";
  const tvSearch = "search/tv";
  const [listToGet, setListToGet] = React.useState(moviesPlaying);
  const [isSearching, setIsSearching] = React.useState(false);


  const fetchOptions = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      authorization: apiKey,
    },
  };

  


  window.onbeforeunload = () => {
    window.scrollTo(0, 0);
  };




  function getGenreList() {
    fetch(
      `${baseUrl}genre/movie/list?api_key=${apiKey}&language=en-US`,
      fetchOptions
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        setGenreList(res);
      })
      .then(() => {
        console.log(genreList);
      })
      .catch((err) => console.log(err));
  }





  function getMovieTVList(pageNum = 1) {
    fetch(
      `${baseUrl}${listToGet}?api_key=${apiKey}&language=en-US&page=${pageNumber}&include_adult=false${
        isSearching ? "&query=" + searchQuery : ""
      }`,
      // `${baseUrl}movie/now_playing?api_key=${apiKey}&language=en-US&page=${
      //   pageNum + ""
      // }`

      fetchOptions
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((movies) => {
        setMovieTVListResults(movies);
        console.log(movies);
      })
      .catch((err) => console.log(err));
  }






  function getMovieSearch(pageNum = 1) {
    // e.preventDefault()

    fetch(
      `${baseUrl}search/${listType}?api_key=${apiKey}&query=${searchQuery}&page=${
        pageNum + ""
      }&include_adult=false`,

      fetchOptions
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((result) => {
        console.log(result);

        setMovieTVListResults(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // function getTVPopularList(pageNum = 1) {
  //   fetch(
  //     "https://api.themoviedb.org/3/tv/popular?api_key=5639a84b2a79f72c3ef1e84caed995ac&language=en-US&page=1",
  //     fetchOptions
  //   )
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //     })
  //     .then((res) => {
  //       setMovieTVListResults(res);
  //     })
  //     .catch((err) => console.log(err));
  // }


  function handlePreviousPageClick() {
    let currentPage = pageNumber;
    if (currentPage > 1){
      currentPage--;
      setPageNumber(currentPage);
    }
    // getMovieTVList(currentPage);
    window.scrollTo(0, 0);
  }


  function handleNextPageClick() {
    let currentPage = pageNumber;
    if (currentPage < movieTVListResults["total_pages"]) {
      currentPage++;
      setPageNumber(currentPage);
    }
    // getMovieTVList(currentPage);
    window.scrollTo(0, 0);
  }


  



  function handleSearchQueryChange(input) {
    setSearchQuery(input.current.value);
  }

  function handleChangeListToGet(listData) {
    if (listData === moviesSearch || listData === tvSearch){
      setIsSearching(true);
    } 
    else {
      setIsSearching(false);
    }
    setPageNumber(1);
    setListToGet(listData);
  }





  React.useEffect(() => {
    getGenreList();
    // getMovieTVList("movie", "now_playing");
  }, []);



  React.useEffect(() => {
    getMovieTVList();
  },[listToGet, pageNumber, searchQuery])


  const searchQueryInput = React.useRef();



  return (
    <div className="App">
      {/* INSERT HEADER COMPONENT HERE */}
      <header className="header">
        <img
          className="header__logo"
          src={logo}
          alt="logo"
          onClick={() => {
            window.location.reload();
          }}
        />
        <ul className="header__nav-menu">
          <li
            className="header__nav-menu_link"
            onClick={() => {
              handleChangeListToGet(moviesPlaying);
              // getMovieTVList();

            }}
          >
            Movies
          </li>
          <li
            className="header__nav-menu_link"
            onClick={() => {
              // getTVPopularList();
              handleChangeListToGet(tvPopular);

              // getMovieTVList();
              // handleChangeSearchType("tv");
            }}
          >
            TV Shows
          </li>
        </ul>
      </header>

      <div className="main-container">
        <div className="side-navbar-container">
          <ul className="side-navbar">
            {genreList.genres.map((genre, index) => {
              return (
                <li className="side-navbar__nav-option" key={index}>
                  {genre.name}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="cards-list-container">
          <form>
            <label>enter search query</label>
            <input ref={searchQueryInput} />
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleSearchQueryChange(searchQueryInput)
                handleChangeListToGet(listToGet === moviesPlaying ? moviesSearch : tvSearch)
                // getMovieSearch();
              }}
            >
              search
            </button>
          </form>
          {/* <div>
            <button
              className="button button_search-type"
              onClick={() => {
                handleChangeSearchType("movie");
              }}
            >
              Search for movies
            </button>

            <button
              className="button button_search-type"
              onClick={() => {
                handleChangeSearchType("tv");
              }}
            >
              Search for tv shows
            </button>
          </div> */}
          <ul className="cards-list">
            {movieTVListResults.results.map((result, index) => {
              return (
                <MovieCard
                  key={index}
                  src={
                    result["poster_path"] !== null
                      ? baseImageUrl + result["poster_path"]
                      : noPostFound
                  }
                  title={result.title || result.name}
                />
              );
            })}
          </ul>
          <button onClick={handlePreviousPageClick}>Previous page</button>
          <button onClick={handleNextPageClick}>Next page</button>
          <footer className="footer">
            <p>cc alvin 2020</p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
