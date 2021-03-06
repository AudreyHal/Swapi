import React, { useState, useEffect, useRef } from 'react';
import { useMovieApi, useSelectedMovie} from './hooks'
import MovieDropDown from './components/MovieDropdown'
import SortableTable from './components/SortableTable'
import MovieIntro from './components/MovieIntro'
import Logo from './assets/logo.png'
import './App.css';


function App() {
  const { isLoaded, hasError, moviesByDate } = useMovieApi();
  const selectedMovie = useRef(null);
  const [showIntro, setShowIntro] =useState(false);
  const { isLoadingCharacters, fetchCharacterError, characters } = useSelectedMovie({
    selected: selectedMovie.current ? selectedMovie.current : null
  });
  
 
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (selectedMovie.current) {
        setShowIntro(false)
      }
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };


  }, [selectedMovie, isLoadingCharacters, characters])


  const handleMovieSelection = (e) => {
    const selectedTitle = e.target.value;
    const movie = moviesByDate.find(movie => movie.title === selectedTitle);
    // const movie= moviesByDate[selectedMovieIndex ];     
    selectedMovie.current = movie;
    setShowIntro(true);  
  }
  
  return (
    <div className="App">
      {
        (hasError || fetchCharacterError) && (<div className="error_msg">Oops...an error occured. Try again </div>)
      }   
          
      {showIntro ?
      (< MovieIntro data={selectedMovie.current ? selectedMovie.current: []} />)
      :
      (
        <div className="main-content">
          <div className="logo"><img src={Logo} alt="star-wars-logo" /></div>

          {isLoaded ?
            (<MovieDropDown 
            data={moviesByDate}
            onChange={handleMovieSelection}
            value={selectedMovie.current ? selectedMovie.current.title : "Select"}
            />)
          : 
            (<div id="Loader" className="spinner"></div>)
          } 

          {selectedMovie.current && !isLoadingCharacters ? 
            <SortableTable
            data={characters}
            movie={selectedMovie.current ? selectedMovie.current: []}
            /> 
          :
            ""
          } 

        </div>
      )}
    </div>
  );
}

export default App;
