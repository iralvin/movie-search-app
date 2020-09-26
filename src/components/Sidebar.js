import React from "react";
import ReactDOM from "react-dom";
import GenreContext from "../contexts/GenreContext";

function Sidebar(props) {
  const genreList = React.useContext(GenreContext);

  return (
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
  );
}

export default Sidebar;
