import React, { Component } from 'react';
import axios from 'axios'


class Landing extends Component{
  constructor(props){
    super(props);
    this.state={
      movies:[]
    }
  }

  componentDidMount(){
    axios.get('https://swapi.co/api/films')
    .then((response)=>{      
      let movies= response.data.results     
      movies.sort(function(a, b){         
        return +new Date(a.release_date) - +new Date(b.release_date);
      });     
      console.log(movies);
      this.setState({movies: movies})
    })
   
  }
 
  render(){ 
    const options = this.state.movies.map((movie, index)=>     
     <option key={index} value={movie.episode_id}>{movie.title}</option>     
    )    
    return (	
      <div> 
        <select>     
          {options}
        </select>
      </div>
    )
  }
}


export default Landing