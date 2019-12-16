

export const sortMoviesByDate=(movies)=>{
  let sorted_movies= movies.sort((a, b)=> new Date(a.release_date) - new Date(b.release_date));   
  return sorted_movies   
}

export const sortStatus=(sortType, field)=>{
    if (sortType.field === field && sortType.order === "asc") {
      return "asc"
  } else if (sortType.field === field && sortType.order === "desc") {
      return "desc"
  } else {
      return "none"
  }
}


export const sortAsc=(characters, column)=>{   
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


export const convertHeight = (heightInCm) => {
  const heightInInches = heightInCm / 2.54;
  const heightInFeet = heightInCm / 30.48;
  return { heightInCm , heightInInches, heightInFeet}
}

export const totalHeight = (characters) => {
  console.log(characters)
  let AllHeights = characters.map(character => parseInt(character.height));
  let validHeights=  AllHeights.filter(height => Number.isInteger(height));
  let totalHeight = validHeights.reduce((a, b) => a + b, 0);
  let{ heightInInches, heightInFeet } = convertHeight(totalHeight);
  return  `${totalHeight}cm (${heightInFeet.toFixed(2)}ft/${heightInInches.toFixed(2)}in)`;
}



