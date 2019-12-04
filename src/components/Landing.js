import React, { Component } from 'react';
import axios from 'axios'
import {sortDesc, sortAsc} from '../helpers'


class Landing extends Component{
  constructor(props){
    super(props);
    this.state={
      movies:[],
      selectedMovie:[],
      characters:[],
      sortOrder: "",
      sortedColumn:"",
      
     
    }
  }

  componentDidMount(){
    axios.get('https://swapi.co/api/films')
    .then((response)=>{      
      let movies= response.data.results     
      movies.sort(function(a, b){         
        return new Date(a.release_date) - new Date(b.release_date);
      });     
      console.log(movies);
      this.setState({movies: movies})
    })  
    .catch(function (error) {
      // handle error
      console.log(error);
    }) 
  }

  selectMovie=(e)=>{
    console.log(e.target.value);
    let i=e.target.value
    let selectedMovie= this.state.movies[i];
    this.setState({selectedMovie: selectedMovie}, ()=>{
    this.getCharacters() 
    })   
    
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