import React from 'react';
import 'dotenv/config';

const Banner = ({movie}) => {
    const IMG_URL = process.env.REACT_APP_IMG_URL;
    const imgUrl = `${IMG_URL}/original/${movie.backdrop_path}`;
    const bgImg = {backgroundImage: `url(${imgUrl})`}
    return (
        <div className='banner mb-3' style={bgImg}>
            <div className="container h-100 position-relative">
                <div className=" d-none d-md-block banner-content">
                    <div className="container ">
                        <div className="row ">
                            <div className="col-md-6">

                                <h2 className='fw-bolder display-3'>
                                    {movie?.title || movie?.name || movie?.original_name}

                                </h2>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className='blend'/>
        </div>
    )
}

export default Banner;
