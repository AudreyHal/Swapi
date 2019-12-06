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
      isLoaded: false,
      error: false 
    }
  }
  
  componentDidMount(){
    let url='https://swapi.co/api/films'
    fetchData(url)
    .then((response)=>{
      let movies= getSortedMovies(response.data.results );
      this.setState({movies: movies, isLoaded: true });       
    })
    .catch((error)=>{     
      this.setState({error: true });     
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
    .catch((error)=>{     
      this.setState({error: true });      
    })
  }

  catchError=()=>{
    this.setState({error: true });    
  }


  render(){
    let isLoaded=this.state.isLoaded;
    let charactersLoaded= this.state.charactersLoaded;
    let error = this.state.error;
    let closeSection=this.state.closed ? "closed":""
    let PageReady= this.state.isLoaded && !this.state.error ? "open":"notLoaded"
    let classes=`${PageReady} ${closeSection}`
    const options = this.state.movies.map((movie, index)=>     
    <option key={index} value={index}  >{movie.title} </option>     
   ) 
    return(
      <div className="Home"> 
        <div className="d-flex justify-content-center handlers"> 
          {!charactersLoaded && closeSection || !isLoaded && !error ?<div id="Loader" className="spinner"></div> :"" }
          {error? <div className="error_msg"><h2>Oops!!</h2><p>Something went wrong. Try Again.</p></div> :""} 
        </div>
                      
        <div id="pageOne" className={classes}>                        
            <div className="logo"><img src={Logo} alt="star-wars-logo" /></div>
            <div className="select-box select-input-container" >
              <select onChange={this.selectMovie} value="Select" > 
                <option value="Select" >Select a Movie</option>  
                {options}         
              </select>
            </div>           
        </div>       

        { charactersLoaded ? 
          <div id="pageTwo" className={`${this.state.charactersLoaded && !error ? "open":"closed"}`}>          
            <MovieDetails 
            key={this.state.characters} 
            selectedMovie={this.state.selectedMovie}  
            movies={this.state.movies} 
            characters={this.state.characters} 
            charactersLoaded={this.state.charactersLoaded} 
            catchError={this.catchError}>
            </MovieDetails>
          </div>
          :
          "" 
        }         
      </div>
    )
  }
}

export default Home;