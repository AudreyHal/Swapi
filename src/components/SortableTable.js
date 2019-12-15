import React, { useState } from "react";

const SortableTable  = (data) => {
  const [sortType, setSortType] = useState({ field: "", order: "" });
  const [newData, setNewData] = useState(data);

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

  return (
    <div>
      <div className="select-box d-flex gender-selection" >
      <select onChange={this.selectGender} value="Select" >
        {data.map}
        {/* <option value="">Select Gender</option>  
        <option value="all">All</option>  
        <option value="male">Male</option> 
        <option value="female">Female</option>            
        <option value="hermaphrodite">hermaphrodite</option>  
        <option value="n/a">n/a</option>        */}
      </select>
    </div>             

      <div className="table-container d-flex justify-content-center">       
        <table>
          <thead>
            <tr>
              <th onClick={this.sortTable}>Name</th>
              <th onClick={this.sortTable}>Gender</th>
              <th onClick={this.sortTable}>Height</th>
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
  );
};
    
export default SortableTable; 