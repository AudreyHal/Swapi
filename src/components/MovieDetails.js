import React, { Component } from 'react';
import axios from 'axios'
import {sortDesc, sortAsc, getSortedMovies, totalHeight} from '../helpers'
import {fetchData} from '../services'
import Logo from '../assets/logo.png'


class MovieDetails extends Component{
  constructor(props){
    super(props);
    this.state={      
      movies: this.props.movies,
      selectedMovie: this.props.selectedMovie,
      characters: this.props.characters,
      characters_by_gender: this.props.characters,
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
          characters: [...prevState.characters, response.data],
          characters_by_gender: [...prevState.characters_by_gender, response.data]
        }));
      })
    )
  }

  sortTable = (e) => {
    let column = e.target.innerHTML.toLowerCase();
    let characters = this.state.characters_by_gender;    
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

  selectGender=(e)=>{ 
    let gender=e.target.value;
    let characters=this.state.characters
    if(gender !== "all"){
    let sorted_characters= characters.filter(character => character.gender === gender);
    this.setState({characters_by_gender: sorted_characters});
    }
    else{
      this.setState({characters_by_gender: characters});
    }       
  }
 
  render(){
    let characters =this.state.characters_by_gender    
    const options = this.state.movies.map((movie, index)=>     
     <option key={index} value={index}  >{movie.title} </option>     
    ) 
    characters= characters.map((character, index)=>     
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
            <img src={Logo} alt="star-wars-logo" width="130" height="48" />
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
        
        <h1 className="movieTitle">{this.state.selectedMovie.title}</h1>
        <div className="marquee">
         <p>{this.state.selectedMovie.opening_crawl} </p>
        </div>

        <div className="select-box d-flex justify-content-end gender-selection" >
          <select onChange={this.selectGender} value="Select" >
            <option value="">Select Gender</option>  
            <option value="all">All</option>  
            <option value="male">Male</option> 
            <option value="female">Female</option>            
            <option value="hermaphrodite">hermaphrodite</option>  
            <option value="n/a">n/a</option>       
          </select>
        </div>             

         <div className="table-container d-flex justify-content-center">       
          <table className="">
            <thead>
              <tr>
                <th onClick={this.sortTable}>Name</th>
                <th onClick={this.sortTable}>Gender</th>
                <th onClick={this.sortTable}>Height</th>
              </tr>           
            </thead>
            <tbody>               
              {characters}  
              <tr>
                <td>Total Characters {characters.length}</td>
                <td></td>  
                <td>Total Height {totalHeight(characters)}</td>                      
              </tr>                               
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}


export default MovieDetails