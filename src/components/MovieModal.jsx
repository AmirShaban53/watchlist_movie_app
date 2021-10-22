import React from 'react';
import 'dotenv/config';

const MovieModal = ({movie}) => {
    const IMG_URL = process.env.REACT_APP_IMG_URL;
    const imgUrl = `${IMG_URL}/w300/${movie.poster_path}`;
    return (
        <>
            <div className='modal fade' id='movieModal'>
                <div className="modal-dialog">
                    <div className="modal-content dark">
                        <div className="modal-header">
                            <h5 className="modal-title">{movie.original_title}</h5>
                            <button type='button' className='btn btn-close bg-white' data-bs-dismiss='modal'></button>
                        </div>
                        <div className="modal-body">
                            <div className="container">

                                <div className="row pb-3 border-bottom">
                                    <div className="col-md-6">
                                        <img className='img-fluid' src={imgUrl} alt="" />
                                    </div>
                                    <div className="col-md-6">
                                        <div className='my-4'>
                                            <span>TITLE: </span><span>{movie?.title||movie?.name||movie?.original_name}</span>
                                        </div>
                                        <div className='my-4'>
                                            <span>YEAR: </span><span> {movie?.release_date||movie?.first_air_date}</span>
                                        </div>
                                        <div className='my-4'>
                                            <span>RATED: </span><span>{movie.vote_average}/10</span>
                                        </div>
                                        <div className='my-4'>
                                            <span>TYPE: </span><span>{movie.media_type}</span>
                                        </div>
                                        {/* <div className='my-4'>
                                            <button className='btn btn-danger' >add </button>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            <div className="container">
                                <div className="row">
                                    <h2>plot</h2>
                                    <p>
                                        {movie.overview}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MovieModal;
