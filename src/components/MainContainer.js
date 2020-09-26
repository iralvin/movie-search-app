// import React from "react";
// import ReactDOM from "react-dom";

// import Sidebar from "./Sidebar";

// function MainContainer(props) {
//   return (
//     <div className="main-container">
//       <Sidebar />

//       <div className="cards-list-container">
//         <form ref={searchQueryForm}>
//           <label>enter search query</label>
//           <input ref={searchQueryInput} />
//           <button
//             type="submit"
//             onClick={(e) => {
//               e.preventDefault();
//               handleSearchQueryChange(searchQueryInput);
//               handleChangeListToGet(
//                 listToGet === moviesPlaying ? moviesSearch : tvSearch
//               );
//               searchQueryForm.current.reset();
//               // getMovieSearch();
//             }}
//           >
//             search
//           </button>
//         </form>

//         <ul className="cards-list">
//           {movieTVListResults.results.map((result, index) => {
//             return (
//               <MovieCard
//                 key={index}
//                 src={
//                   result["poster_path"] !== null
//                     ? baseImageUrl + result["poster_path"]
//                     : noPostFound
//                 }
//                 title={result.title || result.name}
//               />
//             );
//           })}
//         </ul>
//         <button onClick={handlePreviousPageClick}>Previous page</button>
//         <button onClick={handleNextPageClick}>Next page</button>
//         <footer className="footer">
//           <p>cc alvin 2020</p>
//         </footer>
//       </div>
//     </div>
//   );
// }

// export default MainContainer;
