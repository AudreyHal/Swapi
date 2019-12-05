import React, { Component } from 'react';
import axios from 'axios'
import {sortDesc, sortAsc, getSortedMovies} from '../helpers'
import {fetchData} from '../services'
import Logo from '../assets/logo.png'


class MovieDetails extends Component{
  constructor(props){
    super(props);
    this.state={      
      movies: [],
      selectedMovie:[],
      characters: [],
      sortOrder: "",
      sortedColumn:"",     
    }
  }

  componentDidUpdate(){
    console.log(this.props.charactersLoaded)
  }

  selectMovie=(e)=>{    
    let i=e.target.value
    let selectedMovie= this.state.movies[i];
    this.setState({selectedMovie: selectedMovie}, ()=>{
    this.getCharacters() 
    });     
  }

  getCharacters() {
    this.state.selectedMovie.characters.map((url) =>
      axios.get(url).then((response) => {
        this.setState(prevState => ({
          characters: [...prevState.characters, response.data]
        }));
      })
    )
  }

  sortTable = (e) => {
    let column = e.target.innerHTML.toLowerCase();
    let characters = this.state.characters;    
    let sortOrder=this.state.sortOrder;
    let sortedColumn=this.state.sortedColumn;
    let sorted_characters;

    if (sortOrder === "asc" && sortedColumn === column) {
      sorted_characters= sortDesc(characters, column)
    }
    else {      
      this.setState({ sortOrder: "asc", sortedColumn: column});
      sorted_characters= sortAsc(characters, column)
    }
    this.setState({ characters: sorted_characters });   
  } 

 
  render(){     
    const options = this.state.movies.map((movie, index)=>     
     <option key={index} value={index}  >{movie.title} </option>     
    ) 
    const characters= this.state.characters.map((character, index)=>     
    <tr key={index} >
      <td >{character.name} </td> 
      <td >{character.gender} </td> 
      <td >{character.height} </td> 
    </tr>    
   )   
    return (	
      <div className="MovieDetails">

        <div className="container-fluid page-header">       
          <div className="row">
            <div className="col-sm-12 col-md-6 left-header-column">
            <img src={Logo} alt="star-wars-logo" width="170" height="68" />
            </div> 

            <div className="col-sm-12 col-md-6 right-header-column">
              <div className="select-box" >
                <select onChange={this.selectMovie} value="Select" > 
                  <option value="Select" >Select a Movie</option>  
                  {options}         
                </select>
              </div>
            </div>

          </div>
        </div>
        
        <h1>{this.state.selectedMovie.title}</h1>
        <div class="marquee">
         <p>{this.state.selectedMovie.opening_crawl} </p>
        </div>             
                
        <table className="d-flex justify-content-center">
          <thead>
            <tr>
              <th onClick={this.sortTable}>Name</th>
              <th onClick={this.sortTable}>Gender</th>
              <th onClick={this.sortTable}>Height</th>
            </tr>
            <tr>
              <td>Total Characters {this.state.characters.length}</td>
              <td></td>  
              <td>Total Height {this.state.characters.length}</td>                      
            </tr>
          </thead>
          <tbody>               
            {characters}                                 
          </tbody>
        </table>
      </div>
    )
  }
}


export default MovieDetails