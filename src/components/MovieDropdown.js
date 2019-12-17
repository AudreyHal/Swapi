import React from 'react';


const MovieDropDown = ({ data, onChange, value}) => { 
    
      return (
        <div className="select-box" >
          <select onChange={onChange} value={value} > 
            <option value="Select"  disabled>Select a Movie ...</option>           
            {data.map((movie, index)=>     
              <option key={index} value={movie.title}> {movie.title} </option>
            )
            }                    
          </select>
        </div>
      );
  };  
  
export default MovieDropDown;