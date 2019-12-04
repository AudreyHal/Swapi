
export const sortAsc=(characters, column, sortOrder, sortedColumn)=>{  
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


export const sortDesc=(characters, column, sortOrder, sortedColumn)=>{  
  let desc_characters = characters.reverse();
  return desc_characters;  
} 

