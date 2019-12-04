import React, { Component } from 'react';
import axios from 'axios'
import {sortDesc, sortAsc, getSortedMovies} from '../helpers'


class Landing extends Component{
  constructor(props){
    super(props);
    this.state={      
      movies: this.props.movies,
      selectedMovie:this.props.selectedMovie,
      characters: this.props.characters,
      sortOrder: "",
      sortedColumn:"",     
    }
  }


  componentDidUpdate(){    
    console.log("cyharacters"+this.props.characters);
    console.log(this.props.charactersLoaded);
   
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
      sorted_characters= sortDesc(characters, column, sortOrder, sortedColumn)
    }
    else {      
      this.setState({ sortOrder: "asc", sortedColumn: column});
      sorted_characters= sortAsc(characters, column, sortOrder, sortedColumn)
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
      <div> 
        <h1>{this.state.selectedMovie.title}</h1>
        <select onChange={this.selectMovie} value="Select"> 
          <option value="Select" >Select a Movie</option>    
          {options}
        </select>
        {this.state.selectedMovie.title}
        
        {/* <button onClick={this.click}>show</button> */}
        <table >
          <thead>
            <tr>
              <th onClick={this.sortTable}>Name</th>
              <th onClick={this.sortTable}>Gender</th>
              <th onClick={this.sortTable}>Height</th>
            </tr>
            <tr>
              <td>Total Character{this.state.characters.length}</td>
              
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


export default Landing