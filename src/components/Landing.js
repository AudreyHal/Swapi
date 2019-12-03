import React, { Component } from 'react';
import axios from 'axios'


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

  sort = (e) => {
    let characters = this.state.characters;
    let column = e.target.innerHTML.toLowerCase();
    if (this.state.sortOrder === "asc" && this.state.sortedColumn === column) {
      let desc_characters = characters.reverse();
      this.setState({
        characters: desc_characters
      });
    } else {
      
      this.setState({
        sortOrder: "asc",
        sortedColumn: column
      });

      if (column === "height") {
        characters.sort(function (a, b) {
          let A = parseInt(a.height);
          let B = parseInt(b.height);
          return (A < B ? -1 : 0)
          return (A > B ? 1 : 0)
        });
      } else {
        characters.sort(function (a, b) {
          let A = a[column].toUpperCase();
          let B = b[column].toUpperCase();
          return (A < B ? -1 : 0)
          return (A > B ? 1 : 0)
        });
      }
    }
    this.setState({
      characters: characters
    })
    console.log(characters);
  }

  click=()=>{
    console.log(this.state.selectedMovie)
    console.log(this.state.characters)
   
  }

  // calculateHeight(){
  //   this.state.characters.reduce((a,b)=>a.height + b.height)
  // }
 
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
        <button onClick={this.click}>show</button>
        <table >
          <thead>
            <tr>
              <th onClick={this.sort}>Name</th>
              <th onClick={this.sort}>Gender</th>
              <th onClick={this.sort}>Height(cm)</th>
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