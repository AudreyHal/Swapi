

export const getSortedMovies=(movies)=>{
  let sorted_movies= movies.sort((a, b)=> new Date(a.release_date) - new Date(b.release_date));   
  return sorted_movies   
}


export const sortAsc=(characters, column)=>{  
  console.log(column)
  let asc_characters;
  if (column === "height") {
   asc_characters= characters.sort((a, b)=> parseInt(a.height) - parseInt(b.height));
  }
   else {
    asc_characters=characters.sort((a, b)=> a[column].localeCompare(b[column]));      
  }
  return asc_characters;
}


export const sortDesc=(characters, column)=>{  
  let desc_characters = characters.reverse();
  return desc_characters;  
} 


