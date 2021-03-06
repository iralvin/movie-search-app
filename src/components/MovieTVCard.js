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



function MovieTVCard(props) {
  const { path } = useRouteMatch();
  const { pathname } = useLocation();

  console.log(path);
  return (
    <li className="cards-list__item">
      <NavLink
        to={`${pathname}/${props.cardDetails.title || props.cardDetails.name}/${props.cardDetails.id}`}
      >
      <div
        className="cards-list__item_details"
        onClick={() => {
          console.log(path);
          console.log(pathname)
          // props.onCardClick(props.cardDetails);
        }}
      >
        <img className="cards-list__item_image" src={props.src} alt="" />
        <div className="cards-list__item_title-container">
          <p className="cards-list__item_title">{props.title}</p>
        </div>
      </div>
      </NavLink>
    </li>
  );
}

export default MovieTVCard;
