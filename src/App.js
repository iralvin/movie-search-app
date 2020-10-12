import React from "react";
import "./App.css";
import { apiKey } from "./apiKey.js";
import {
  Switch,
  Route,
  Redirect,
  Link,
  NavLink,
  useParams,
  useRouteMatch,
} from "react-router-dom";

import {
  baseUrl,
  baseImageUrlw200,
  moviesPlaying,
  moviesSearch,
  tvPopular,
  tvSearch,
  fetchOptions,
} from "./constants/constants";

import GenreContext from "./contexts/GenreContext";
import MovieTVListContext from "./contexts/MovieTVListContext";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import SearchForm from "./components/SearchForm";
import MovieTVList from "./components/MovieTVList";
import MovieTVDisplay from "./components/MovieTVDisplay";
import TVList from "./components/TVList";
import Footer from "./components/Footer";

function App() {
  const [genreList, setGenreList] = React.useState({
    genres: [],
  });

  const [movieTVListResults, setMovieTVListResults] = React.useState({
    results: [],
  });

  const [genreListType, setGenreListType] = React.useState("movie"); // movie.....tvlist
  const [searchQuery, setSearchQuery] = React.useState("");
  const [pageNumber, setPageNumber] = React.useState(1);

  const [listToGet, setListToGet] = React.useState(moviesPlaying);
  const [isSearching, setIsSearching] = React.useState(false);
  const [selectedGenreId, setSelectedGenreId] = React.useState("");
  const [selectedMovieTV, setSelectedMovieTV] = React.useState("rogue");

  window.onbeforeunload = () => {
    window.scrollTo(0, 0);
  };

  function getGenreList() {
    fetch(
      `${baseUrl}genre/${genreListType}/list?api_key=${apiKey}&language=en-US`,
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

  function getMovieTVList() {
    fetch(
      `${baseUrl}${listToGet}?api_key=${apiKey}&language=en-US&page=${pageNumber}&include_adult=false${
        isSearching ? "&query=" + searchQuery : ""
      }`,
      fetchOptions
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((media) => {
        setMovieTVListResults(media);
        console.log(media);
      })
      .catch((err) => console.log(err));
  }

  function getMovieTVListByGenre(genreId) {
    fetch(
      `${baseUrl}discover/movie?api_key=${apiKey}&language=en-US&include_adult=false&page=${pageNumber}&with_genres=${genreId}`,
      fetchOptions
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(media => {
        console.log(media)
        setMovieTVListResults(media);
      })
      .catch((err) => console.log(err));
  }

  function handlePreviousPageClick() {
    let currentPage = pageNumber;
    if (currentPage > 1) {
      currentPage--;
      setPageNumber(currentPage);
    }
    window.scrollTo(0, 0);
  }

  function handleNextPageClick() {
    let currentPage = pageNumber;
    if (currentPage < movieTVListResults["total_pages"]) {
      currentPage++;
      setPageNumber(currentPage);
    }
    window.scrollTo(0, 0);
  }

  function handleSearchQueryChange(input) {
    setSearchQuery(input);
  }

  function handleChangeListToGet(listData) {
    if (listData === moviesSearch || listData === tvSearch) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }

    setPageNumber(1);
    setListToGet(listData);
    handleChangeGenreList(listData);
  }

  function handleChangeGenreList(currentMovieTVListToGet) {
    if (currentMovieTVListToGet === moviesPlaying) {
      setGenreListType("movie");
    } else if (currentMovieTVListToGet === tvPopular) {
      setGenreListType("tv");
    }
  }

  React.useEffect(() => {
    getGenreList();
  }, [genreListType]);

  React.useEffect(() => {
    getMovieTVList();
  }, [listToGet, pageNumber, searchQuery]);

  return (
    <div className="App">
      <Header
        onMovieHeaderClick={() => {
          handleChangeListToGet(moviesPlaying);
        }}
        onTVHeaderClick={() => {
          handleChangeListToGet(tvPopular);
        }}
      />

      <div className="main-container">
        <GenreContext.Provider value={genreList}>
          <Sidebar 
            onGenreClick={(genreId) => {
              getMovieTVListByGenre(genreId)
            }}
          />
        </GenreContext.Provider>

        <div className="cards-list-container">
          <SearchForm
            onSearchQueryChange={(input) => {
              handleSearchQueryChange(input);
            }}
            currentListToGet={listToGet}
            onListChange={(listData) => {
              handleChangeListToGet(listData);
            }}
          />

          <MovieTVListContext.Provider value={movieTVListResults}>
            <Switch>
              <Route exact path="/:media/search/:searchQuery/:title/:id">
                <MovieTVDisplay />
              </Route>

              <Route path="/:media/search">
                <MovieTVList
                  onLoad={() => {
                    handleChangeListToGet(listToGet);
                  }}
                />
              </Route>

              <Route exact path="/:media/:title/:id">
                <MovieTVDisplay />
              </Route>

              <Route exact path="/movie">
                <MovieTVList
                  onLoad={() => {
                    handleChangeListToGet(moviesPlaying);
                  }}
                  listToGet={listToGet}
                  onCardClick={(selectedTitle) => {
                    console.log(selectedTitle);
                    setSelectedMovieTV(selectedTitle);
                  }}
                />
              </Route>

              <Route exact path="/tv">
                <MovieTVList
                  onLoad={() => {
                    handleChangeListToGet(tvPopular);
                  }}
                  listToGet={listToGet}
                />
              </Route>

              <Route exact path="/">
                <Redirect to="/movie" />
              </Route>
            </Switch>
          </MovieTVListContext.Provider>

          <button onClick={handlePreviousPageClick}>Previous page</button>
          <p>{pageNumber}</p>
          <button onClick={handleNextPageClick}>Next page</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
