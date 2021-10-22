import React from 'react';
import WatchCard from './WatchCard';

const WatchList = ({movies, label}) => {
    return (
        <>
            <div className="container">
                <h2>{`${label} >`}</h2>
            </div>
            <div className='row'>
                <div className="d-flex movies">
                    {movies.map((movie)=>{
                        return <WatchCard key={movie.id} movie={movie}/>
                    })}

                </div>
            </div>
        </>
    )
}

export default WatchList;
