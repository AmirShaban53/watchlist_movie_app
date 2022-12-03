import React, { useContext } from "react";
import MovieCard from "./MovieCard";
import { MovieContext } from "../App";

const MovieList = ({ movies, label }) => {
  const { setSelectedMovie, setWatchList, watchList } =
    useContext(MovieContext);

  const selectMovie = (id) => {
    const selected = movies.filter((movie) => movie.id === id);
    setSelectedMovie(selected[0]);
  };
  const addToWatch = async (id) => {
    try {
      const already = watchList.filter((movie) => movie.id === id);
      if (already.length >= 1) {
        return;
      } else {
        const selected = movies.filter((movie) => movie.id === id);
        setWatchList((watch) => [...watch, selected[0]]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="container">{label && <h2>{`${label} >`}</h2>}</div>
      <div className="row">
        <div className="d-flex movies">
          {movies.map((movie) => {
            return (
              <MovieCard
                key={movie.id}
                movie={movie}
                selectMovie={selectMovie}
                addToWatch={addToWatch}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
