import React, { useState } from "react";
import useMovieApi from '../hooks'

const MovieDetail  = () => {
  const [count, setCount] = useState(0);
  const [movies, getMovies] = useState([]);
  const [selectedMovie, selectMovie]= useState([]);
  const [characters, getcharacters] = useState([]);
  const [characters_by_gender, get_characters_by_gender] = useState([]);
  const [characters_by_gender, get_characters_by_gender] = useState([]);
  const [sortOrder, changeSortOrder] = useState("");
  const [sortedColumn, changeSortedColumn] = useState("");

  componentDidMount(){
    let url='https://swapi.co/api/films'
    fetchData(url)
    .then((response)=>{
      let movies= getSortedMovies(response.data.results );
      this.setState({movies: movies, isLoaded: true });   
      console.log(movies)
    })
    .catch((error)=>{     
      this.setState({error: true });     
    })    
  }
 
  const selectMovie=(e)=>{    
    let i=e.target.value
    let selectedMovie= this.state.movies[i];
    this.setState({selectedMovie: selectedMovie}, ()=>{
    this.getCharacters() 
    });     
  }

  const getCharacters=()=>{
    let characters=[]
    this.state.selectedMovie.characters.map((url) =>
      fetchData(url).then((response) => {
        characters.push(response.data)
        this.setState(({
          characters: characters,
          characters_by_gender: characters
        }));
      })
      .catch((error) =>     
        this.props.catchError()
      )
    )
  }

  const sortTable = (e) => {
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

 const selectGender=(e)=>{ 
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
     
  return (	
    <div className="MovieDetails">
      <div className="container-fluid page-header">       
        <div className="row">
          <div className="col-sm-12 col-md-6 left-header-column">
            <img src={Logo} alt="star-wars-logo" width="130" height="48" />
          </div> 
          <div className="col-sm-12 col-md-6 right-header-column">
            <div className="select-box" >
              <select onChange={selectMovie} value="Select" > 
                <option value="Select" >Select a Movie</option>  
                {options}         
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <h1 className="movieTitle">{selectedMovie.title}</h1>
      <div className="marquee">
       <p>{selectedMovie.opening_crawl} </p>
      </div>

      <div className="select-box d-flex gender-selection" >
        <select onChange={selectGender} value="Select" >
          <option value="">Select Gender</option>  
          <option value="all">All</option>  
          <option value="male">Male</option> 
          <option value="female">Female</option>            
          <option value="hermaphrodite">hermaphrodite</option>  
          <option value="n/a">n/a</option>       
        </select>
      </div>             

       <div className="table-container d-flex justify-content-center">       
        <table>
          <thead>
            <tr>
              <th onChange={sortTable} >Name</th>
              <th onClick={sortTable}>Gender</th>
              <th onClick={sortTable}>Height</th>
            </tr>           
          </thead>
          <tbody>               
            {table_characters}  
            <tr>
              <td><b>Total Characters:</b> {characters.length}</td>                
              <td colSpan="2"><b>Total Height:</b> {totalHeight(characters)}</td>                      
            </tr>                               
          </tbody>
        </table>
      </div>
    </div>
  )
};

export default MovieDetail; 