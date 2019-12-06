import {sortDesc, sortAsc, getSortedMovies} from '../helpers'

describe('HELPERS', () => {
  it('should sort in ascending order', () => {
    let characters = [
      { gender:"female", height:120, name:"gina" },
      { gender:"male", height:220, name:"femi" },
      { gender:"male", height:220, name:"iya" }]
    let column ="name";
    let expectedResult= [      
      { gender:"male", height:220, name:"femi" },
      { gender:"female", height:120, name:"gina" },
      { gender:"male", height:220, name:"iya" }]
      
     expect(sortAsc(characters, column)).toEqual(expectedResult)
 })
})

describe('HELPERS', () => {
  it('should sort in reverse/descending order', () => {
    let sorted_characters = [
      { gender:"male", height:220, name:"femi" },
      { gender:"female", height:120, name:"gina" },
      { gender:"male", height:220, name:"iya" }]
    let column ="name";
    let expectedResult= [    
      { gender:"male", height:220, name:"iya" },
      { gender:"female", height:120, name:"gina" },
      { gender:"male", height:220, name:"femi" }]
      
     expect(sortDesc(sorted_characters, column)).toEqual(expectedResult)
 })
})
 
describe('HELPERS', () => {
  it('should sort movies by release date', () => {
    let movies = [
      {title: "A New Hope", producer: "Gary Kurtz, Rick McCallum", release_date: "1977-05-25" },
      {title: "Star Rising", producer: "Gary Kurtz, Rick McCallum", release_date: "1877-05-25" },
      {title: "Fast and Furious", producer: "Gary Kurtz, Rick McCallum", release_date: "2010-05-25" }
    ]
   
    let expectedResult=[
      {title: "Star Rising", producer: "Gary Kurtz, Rick McCallum", release_date: "1877-05-25" },
      {title: "A New Hope", producer: "Gary Kurtz, Rick McCallum", release_date: "1977-05-25" },      
      {title: "Fast and Furious", producer: "Gary Kurtz, Rick McCallum", release_date: "2010-05-25" }
    ]
      
     expect(getSortedMovies(movies)).toEqual(expectedResult)
 })
})


 