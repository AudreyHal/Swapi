import axios from 'axios'
import {fetchData} from '../services'

jest.mock('axios');

describe('SERVICES', () => {
  it('fetch data from url', () => {
    let movies = [
      {title: "A New Hope", producer: "Gary Kurtz, Rick McCallum", release_date: "1977-05-25" },
      {title: "Star Rising", producer: "Gary Kurtz, Rick McCallum", release_date: "1877-05-25" },
      {title: "Fast and Furious", producer: "Gary Kurtz, Rick McCallum", release_date: "2010-05-25" }
    ]
  let url='https://swapi.co/api/films'

  const resp = { data : movies };

  axios.get.mockImplementation(() => Promise.resolve(resp));

  fetchData(url).then(resp => expect(resp.data).toEqual(movies));
 })
})

