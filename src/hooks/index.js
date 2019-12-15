import { useState, useEffect, useRef } from 'react';
import { sortMovieByDate } from '../utils';
import axios from 'axios';

//change name to fetchmovies
//MoviesByDate

export const useMovieApi=()=>{
  let url='https://swapi.co/api/films';
  const [allMovies, getallMovies] = useState([]);
  const [isLoaded, checkIsLoaded] = useState(false);
  const [hasError, checkIfHasError] = useState(false);

  useEffect(() => {
  fetchMovies(url)
  .then((response)=>{    
    const MoviesByDate= getMoviesByDate(response.data.results );
    getallMovies(MoviesByDate);
    checkIsLoaded(true);    
  })
  .catch((error)=>{     
    checkIfHasError(true);   
  })    
});
return {allMovies, isLoaded, hasError }
}