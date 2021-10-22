import './styles/App.css';
import axios from 'axios';
import React, {useState, useEffect} from 'react';

import MovieModal from './components/MovieModal';
import MovieList from './components/MovieList';
import WatchList from './components/WatchList';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Banner from './components/Banner';
import Dropdown from './components/Dropdown';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { library } from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(fas);

export const MovieContext = React.createContext();

function App() {
  const [genres, setGenres] = useState([]);
  const [bannerMovie, setBannerMovie]= useState({});
  const [searchValue, setSearchValue] = useState('');
  const [selectedMovie, setSelectedMovie] = useState({});
  const [selectedGenre, setSelectedGenre] = useState({});
  
  //row lists
  const [trendingList, setTrendingList]= useState([]);
  const [topRatedList, setTopRatedList]= useState([]);
  const [ByGenreList, setByGenreList]= useState([]);
  const [movieList, setMovieList]= useState([]);
  const [watchList, setWatchList]= useState([]);

  const LOCAL_KEY = process.env.REACT_APP_LOCAL_KEY;
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const API_KEY = process.env.REACT_APP_API_KEY;


  const getMovieList = async(search) =>{
    try {
      const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${searchValue}`;
      const movielist = await axios.get(url);
      if(movielist.data.results){
        setMovieList(movielist.data.results);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const selectWatch =  (id) => {
        const selected = watchList.filter(movie => movie.id === id);
        setSelectedMovie(selected[0]);
  }
  const selectGenre = (id) => {
    const selected = genres.filter(genre => genre.id === id);
    console.log(selected[0]);
    setSelectedGenre(selected[0]);
  }
  const getGenresList = async() => {
    try {
      const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
      const genres = await axios.get(url);
      if(genres.data.genres)
      {
        setGenres(genres.data.genres);
        setSelectedGenre(genres.data.genres[Math.floor(Math.random()*genres.data.genres.length)])
      }
    } 
    catch (error) {
      console.log(error);
    }
  }
  const getTrendingList = async() => {
    try {
      const url = `${BASE_URL}/trending/all/day?api_key=${API_KEY}`
      const trending = await axios.get(url);
      if(trending.data.results)
      {
        setTrendingList(trending.data.results);
        setBannerMovie(trending.data.results[Math.floor(Math.random()*trending.data.results.length)]);
      }
    } 
    catch (error) {
      console.log(error);
    }
  }
  const getByGenreList = async() => {
    try {
      const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&page=1&with_genres=${selectedGenre.id}`
      const trending = await axios.get(url);
      if(trending.data.results)
      {
        setByGenreList(trending.data.results);
      }
    } 
    catch (error) {
      console.log(error);
    }
  }
  const getTopRated = async() => {
    try {
      const url = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`
      const topRated = await axios.get(url);
      if(topRated.data.results)
      {
        setTopRatedList(topRated.data.results);
      }
    } 
    catch (error) {
      console.log(error);
    }
  }
  const removeWatch = async(id) => {
    const newWatch = watchList.filter(watch => watch.id !== id);
    setWatchList(newWatch);
  }

  
  const contextValue = {
    removeWatch,
    selectWatch,
    selectGenre,
    setSelectedMovie,
    setWatchList,
    watchList
  }

  useEffect(()=>{
    const watchListJSON = localStorage.getItem(LOCAL_KEY);
    if(watchListJSON != null){
      setWatchList(JSON.parse(watchListJSON));
    }
    getTrendingList();
    getGenresList();
    getTopRated();
  },[])
  
  useEffect(()=>{
    getByGenreList();

  },[selectedGenre])

  useEffect(()=>{
    getMovieList(searchValue);
  },[searchValue])

  useEffect(()=>{
    localStorage.setItem(LOCAL_KEY, JSON.stringify(watchList));
  },[watchList])

  return (
    <div className='container-fluid px-0'>

      <Navbar searchValue={searchValue} setSearchValue={setSearchValue}/>
      <MovieContext.Provider value={contextValue}>
        {!searchValue && <Banner movie={bannerMovie}/>}
        {!searchValue && 
          <div className='mx-3 '>
            <MovieList label={'trending'} movies={trendingList}/>
            <MovieList label={'top rated'} movies={topRatedList}/>
            

            <Dropdown genres={genres} selectedGenre={selectedGenre}/>
                
            <MovieList movies={ByGenreList}/>
          </div>
        }
        {searchValue && 
          <div className='mx-3 mt-5 pt-5'>
            <MovieList label={`search: ${searchValue}`} movies={movieList}/>
          </div>
        }
        {watchList.length>=1 && 
          <div className='mx-3 '>
            <WatchList label={`your watch list`} movies={watchList}/>
          </div>
        }
      </MovieContext.Provider>
      <MovieModal movie={selectedMovie}/>
      <div className='container my-3'>
        <h5 className=' fw-bolder'>Developer's  <span className='text-danger'>note</span>:</h5>
        <p className='ps-5 fs-4 fst-italic'>
          hello!
          <br/>
          <span className='text-danger fw-bolder '>WATCHlIST</span> is a site for you to search for movies, series or tv shows 
          and instantly save them onto your watch list for later.
          <br/>
          <br/>
          enjoy. <FontAwesomeIcon className='text-warning' icon='smile'/> 
        </p>
      </div>
      <Footer/>
    </div>
  );

}



export default App;
