import React, { Component } from 'react'
import axios from 'axios'
import MovieDetails from './MovieDetails'
import {getSortedMovies} from '../helpers'
import {fetchData} from '../services'
import Logo from '../assets/logo.png'


class Home extends Component{
  constructor(props){
    super(props);
    this.state={
      movies:[],
      selectedMovie:[],
      characters:[],      
      closed: false,
      charactersLoaded: false,
      isLoaded: false 
    }
  }
  
  componentDidMount(){
    let url='https://swapi.co/api/films'
    fetchData(url)
    .then((response)=>{
      let movies= getSortedMovies(response.data.results );
      this.setState({movies: movies, isLoaded: true });      
      console.log(movies)
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
      fetchData(url).then((response) => {
        
        this.setState(prevState => ({
          characters: [...prevState.characters, response.data]
        }));
      })
    )
    Promise.all(iterable)
    .then(responses => {      
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
          <MovieDetails key={this.state.characters} selectedMovie={this.state.selectedMovie}  movies={this.state.movies} characters={this.state.characters} charactersLoaded={this.state.charactersLoaded} ></MovieDetails>
        </div>
        : ""
        }
      </div>
    )
  }
}

export default Home;