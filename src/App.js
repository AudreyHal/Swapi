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
   
    let allMovies=moviesByDate.map((movie)=>{
    return movie.title})

    const timeoutId = setTimeout(() => {
      if (selectedMovie.current) {
        setShowIntro(false)
      }
    }, 3000);
    return () => {
      clearTimeout(timeoutId);
    };


  }, [selectedMovie, isLoadingCharacters, characters])
  
  const handleMovieSelection = (e) => {
    const selectedMovieIndex = e.target.value;
    const movie= moviesByDate[selectedMovieIndex ];     
    selectedMovie.current = movie;
    setShowIntro(true)
    console.log("selectedMovie"+ selectedMovie.current.title);
  
   }
  
  return (
    <div className="App">       
      {showIntro ?< MovieIntro data={selectedMovie.current ? selectedMovie.current: []} />: ""}
  {!showIntro && (<div className="logo"><img src={Logo} alt="star-wars-logo" /></div>)}
      {isLoaded ?         
      <MovieDropDown 
      data={moviesByDate}
      onChange={handleMovieSelection}
      value={selectedMovie.current ? selectedMovie.current.title : "Select a Movie"}
      />
      :""} 
      {selectedMovie.current && !isLoadingCharacters ? 
      <SortableTable
      data={characters}
      movie={selectedMovie.current ? selectedMovie.current: []}
      /> 
      :""
      } 
    </div>
  );
}

export default App;
