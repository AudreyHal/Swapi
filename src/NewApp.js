import React, { useState, useEffect, useRef } from 'react';
import { useSwapiApi, useSelectedMovie} from './hooks'
import MovieDropDown from './components/MovieDropdown'

import './App.css';


function App() {
  const { isLoading, hasError, movies } = useMovieApi();
  
  return (
    <div className="App">           
       <MovieDropDown />
       
    </div>
  );
}

export default App;
