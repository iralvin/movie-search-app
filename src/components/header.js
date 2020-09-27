import React from "react";
import { Switch, Route, Link, NavLink, Redirect } from "react-router-dom";

import logo from "../images/movie-logo.png";

function Header(props) {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={logo}
        alt="logo"
        onClick={() => {
          window.location.href = "/";
        }}
      />

      <ul className="header__nav-menu">
        <li
          className="header__nav-menu_link"
          onClick={props.onMovieHeaderClick}
        >
          <NavLink to="/movies">Movies</NavLink>
        </li>
        <li className="header__nav-menu_link" onClick={props.onTVHeaderClick}>
          <NavLink to="/tvshows">TV Shows</NavLink>
        </li>
      </ul>
    </header>
  );
}

export default Header;
