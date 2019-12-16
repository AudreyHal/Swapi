import React, { useState, useRef, useEffect } from "react";
import {sortDesc, sortAsc, getSortedMovies, sortStatus, totalHeight} from '../helpers'
import arrow from '../assets/up-arrow.svg';

const SortableTable  = ({data, movie}) => {
  const [sortType, setSortType] = useState({ field: "", order: "" });
  const [newData, setNewData] = useState([]);
  const genderSet = useRef(new Set());
  const gendersToArray = useRef([]);
  let [defaultGenderOption, setdefaultGenderOption] = useState("all");

  
  useEffect(() => { 
    data.map((item) => {
      genderSet.current.add(item.gender);
    });
  
    gendersToArray.current = Array.from(genderSet.current);     
    setNewData(data)
    setdefaultGenderOption("all");
  }, [data])


  const handleTableSort = (e) => {
    const field = e.target.id;    
    let sorted_characters;    

    if (sortType.order === "asc" && sortType.field === field) {
      sorted_characters= sortDesc(newData, field)
      setSortType({ field, order: "desc" });    
    }
    else { 
      setSortType({ field, order: "asc" })     
      sorted_characters= sortAsc(newData, field)      
    }
    setNewData(sorted_characters);
    totalHeight(newData)
  } 


  const handleGenderSelection = (e) => {
    const selectedGender = e.target.value;
    setdefaultGenderOption(e.target.value)
    let result;

    if (selectedGender !== "all") {
      result = data.filter((character) => character.gender === selectedGender);
    } else {
      result = data;
    }
    setNewData(result);
    totalHeight(newData)
  }

  return (
    <div className="SortableTable">
      <div className="select-box">
        <select onChange={handleGenderSelection} value={defaultGenderOption}>
          <option value="all">All</option>
          { gendersToArray.current.map((gender) => (
          <option key={gender} value={gender}>{`${gender.charAt(0).toUpperCase()}${gender.slice(1)}`}</option>
          )) }

        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>
              <button className="table-field" id="name" onClick={handleTableSort}>
                Name
                <img src={arrow} height={10} width={10} alt="toggle arrow" data-toggle={sortStatus(sortType, "name")} />
              </button>
            </th>
            <th>
              <button className="table-field" id="gender" onClick={handleTableSort}>
                Gender
                <img src={arrow} height={10} width={10} alt="toggle arrow" data-toggle={sortStatus(sortType, "gender")}
                />
              </button>
            </th>
            <th>
              <button className="table-field" id="height" onClick={handleTableSort}>
                Height(cm)
                <img src={arrow} height={10} width={10} alt="toggle arrow" data-toggle={sortStatus(sortType,"height")} />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>

          { newData.map(character => (
          <tr key={character.name}>
            <td>{character.name}</td>
            <td>{character.gender}</td>
            <td>{character.height}</td>
          </tr>
          )) }

        </tbody>
        <tfoot>
          <tr>
            <td>
              <div className="footer-field"><b>Total Characters:</b></div> {newData.length}</td>
            <td colSpan="2">
              <div className="footer-field"><b>Total Height:</b></div> {totalHeight(newData)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
    
  );
};
    
export default SortableTable; 