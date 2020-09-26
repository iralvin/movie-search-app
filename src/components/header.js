import React from "react";

import logo from "../images/movie-logo.png";


function Header(props) {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={logo}
        alt="logo"
        onClick={()=>{window.location.reload();}}
      />
      <ul className="header__nav-menu">
        <li
          className="header__nav-menu_link"
          onClick={props.onMovieHeaderClick}
        >
          Movies
        </li>
        <li
          className="header__nav-menu_link"
          onClick={props.onTVHeaderClick}
        >
          TV Shows
        </li>
      </ul>
    </header>
  );
}

export default Header;