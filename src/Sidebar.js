import React from "react";
import ReactDOM from "react-dom";

function Sidebar(props) {
    console.log(props.genreList)
  return (
    <div className="side-navbar-container">
      <ul className="side-navbar">
        {/* {props.genreList.map((genre) => {
          return <li className="side-navbar__nav-option">{genre.name}</li>;
        })} */}
      </ul>
    </div>
  );
}

export default Sidebar;
