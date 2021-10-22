import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({movies, label}) => {
    return (
        <div className=''>
            <div className="container">
                <h2>{`${label} >`}</h2>
            </div>
            <div className='row'>
                <div className="d-flex movies">
                    {movies.map((movie)=>{
                        return <MovieCard key={movie.id} movie={movie}/>
                    })}

                </div>
            </div>
        </div>
    )
}

export default MovieList;
