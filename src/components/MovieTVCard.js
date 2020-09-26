import React from "react";
import ReactDOM from "react-dom";

function MovieCard(props) {
  return (
    <li className="cards-list__item">
      <div className="cards-list__item_details">
        <img className="cards-list__item_image" src={props.src} alt="" />
        <div className="cards-list__item_title-container">
          <p className="cards-list__item_title">{props.title}</p>
        </div>
      </div>
    </li>
  );
}

export default MovieCard;
