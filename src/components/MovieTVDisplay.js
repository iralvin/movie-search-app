import React from 'react';
import { Switch, Route, Link, NavLink, useRouteMatch, useParams } from "react-router-dom";


function MovieTVDisplay(props){
    let {movieTitle} = useParams();
    return(
        <div className="movie-tv-details-container">
            <h1>{`hello world ${movieTitle}`}</h1>
        </div>
    )
}

export default MovieTVDisplay;