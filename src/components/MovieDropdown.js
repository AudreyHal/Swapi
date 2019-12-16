import React from 'react';


const MovieDropDown = ({ data, onChange, value}) => { 
    
      return (
        <div className="select-box" >
          <select onChange={onChange} value={value.title} > 
          <option value="Select"  disabled>Select a Movie ...</option>           
            {data.map((movie, index)=>     
              <option key={index} value={index}> {movie.title} </option>
            )
            }       
                    
          </select>
        </div>
      );
  };  
  
export default MovieDropDown;