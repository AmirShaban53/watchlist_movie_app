import React, {useContext} from 'react';
import 'dotenv/config';
import { MovieContext } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MovieCard = ({movie}) => {
    const IMG_URL = process.env.REACT_APP_IMG_URL;
    const imgUrl = `${IMG_URL}/w300/${movie.poster_path}`;
    const { selectMovie, addToWatch } =useContext(MovieContext);
    return (
        <div className='col m-2'>
            <div className='position-relative overflow-hidden '>
                <img className='' src={imgUrl} alt="movie poster"/>
                <div className='overlay'>
                    <label 
                        onClick={()=>{selectMovie(movie.id)}}
                        type='button' 
                        className='text'
                        data-bs-toggle='modal'
                        data-bs-target='#movieModal'
                    >
                        read more
                    </label>
                </div>
            </div>
            <div className='row pt-1'>
                <div className="col-10"><p>{movie?.title||movie?.name||movie?.original_name}</p></div>
                <div className="col-2">
                    <label type='button' onClick={()=>{addToWatch(movie.id)}}>
                        <FontAwesomeIcon className='fs-4 heart' icon='plus-square'/>
                        
                    </label>
                </div>
            </div>
        </div>
    )
}

export default MovieCard;
