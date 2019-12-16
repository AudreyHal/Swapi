import { useState, useEffect, useRef } from 'react';
import { sortMoviesByDate} from '../helpers';
import {fetchData} from '../services'


export const useMovieApi=()=>{
  const url='https://swapi.co/api/films';
  const [moviesByDate, getMoviesByDate] = useState([]);
  const [isLoaded, checkIsLoaded] = useState(false);
  const [hasError, checkIfHasError] = useState(false);

  useEffect(() => {
    fetchData(url)
    .then((response)=>{  
      console.log("response" + response.data.results)     
      const MoviesByDate= sortMoviesByDate(response.data.results );
      getMoviesByDate(MoviesByDate);
      checkIsLoaded(true);    
    })
    .catch((error)=>{   
      console.log("response" + error)    
      checkIfHasError(true);   
    })    
});
return {moviesByDate, isLoaded, hasError }
}



export const useSelectedMovie=({selected})=>{
  
  const [isLoadingCharacters, setLoadingCharacters] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [previousSelections, updatePreviousSelections] = useState([]);
  const [fetchCharacterError, setFetchCharacterError] = useState(false);
  const charactersUrl = selected ? selected.characters : [];
  let previousSelection;


  console.log("previousSelections"+previousSelections)

  useEffect(() => {
    setLoadingCharacters(true);

    if (previousSelections.length>0){
    previousSelection= previousSelections.find(element=>element.title===selected.title)}

   if (previousSelection){ 
    console.log("previoustitlllllllllllllllllllll"+ previousSelection.characters);   
    setCharacters(previousSelection.characters); 
    setLoadingCharacters(false);
  }
  else{
    
   
    if (charactersUrl.length > 0 ) {
      console.log("selectedg"+ selected.title)
    const request =charactersUrl.map((url) =>
    fetchData(url).then((response) => {
     
      return response.data   
    }));
    
    Promise.all(request)
    .then(responses => {      
      setCharacters(responses);
      setLoadingCharacters(false);  

      updatePreviousSelections([...previousSelections, {
        title:  selected.title,
        characters: responses
      }] )
        
      
    })
    .catch((error)=>{     
      setFetchCharacterError(error);     
    })
  }

}  
  },[characters,charactersUrl, fetchCharacterError, selected])  

  return { isLoadingCharacters, fetchCharacterError, characters }

}