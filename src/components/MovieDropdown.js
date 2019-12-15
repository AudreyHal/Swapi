import React from 'react';


const MovieDropDown = ({ isLoading, data, placeholder, onChange, value}) => { 
    
      return (
        <div className="select-box" >
          <select onChange={this.selectMovie} value="Select" > 
            <option value="Select" >Select a Movie</option>  
            {options}         
          </select>
        </div>
      );
  };
  
  
  export default MovieDropDown;