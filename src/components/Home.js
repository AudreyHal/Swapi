import React, { Component } from 'react';
import Landing from './Landing'
import axios from 'axios'
import {getSortedMovies} from '../helpers'
import Logo from '../assets/logo2.png'


class Home extends Component{
  constructor(props){
    super(props);
    this.state={
      movies:[],
      selectedMovie:[],
      characters:[],
      closed: false,
      charactersLoaded: true   
    }
  }
  
  componentDidMount(){
    axios.get('https://swapi.co/api/films')
    .then((response)=>{      
      let movies= getSortedMovies(response.data.results );     
      console.log(movies)
      this.setState({movies: movies});
    })  
    .catch(function (error) {     
      console.log(error);
    }) 
  }

  selectMovie=(e)=>{    
    let i=e.target.value
    let selectedMovie= this.state.movies[i];
    this.setState({selectedMovie: selectedMovie, closed:"closed" }, ()=>{
      this.getCharacters() 
    })
  }

  getCharacters() {
    let iterable=this.state.selectedMovie.characters.map((url) =>
      axios.get(url).then((response) => {
        this.setState(prevState => ({
          characters: [...prevState.characters, response.data]
        }));
      })
    )
    Promise.all(iterable)
    .then(responses => {      
      console.log("dddddddddddddddddddd"+this.state.characters);
      this.setState({charactersLoaded: true });
    })
  }


  render(){
    const options = this.state.movies.map((movie, index)=>     
    <option key={index} value={index}  >{movie.title} </option>     
   ) 
    return(
      <div className="Home">        
        <div id="pageOne" className={`${this.state.closed ? "closed":"open"}`}>
          <div className="logo"><img src={Logo} alt="star-wars-logo" /></div>
          <div className="select-box select-input-container" >
            <select onChange={this.selectMovie} value="Select" > 
              <option value="Select" >Select a Movie</option>  
              {options}         
            </select>
          </div>
        </div>

        { this.state.charactersLoaded ?
        <div id="pageTwo" className={`${this.state.charactersLoaded ? "open":"closed"}`}>          
          <Landing key={this.state.characters} selectedMovie={this.state.selectedMovie}  movies={this.state.movies} characters={this.state.characters} charactersLoaded={this.state.charactersLoaded} ></Landing>
        </div>
        : ""
        }
      </div>
    )
  }
}

export default Home;