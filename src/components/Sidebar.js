import React from "react";
import ReactDOM from "react-dom";
import GenreContext from "../contexts/GenreContext";

function Sidebar(props) {
  const genreList = React.useContext(GenreContext);

  return (
    <div className="sidebar">
      <ul className="sidebar__nav-menu">
        {genreList.genres.map((genre, index) => {
          return (
            <li className="sidebar__nav-menu_nav-option" key={index}>
              {genre.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
