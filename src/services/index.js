
import axios from 'axios'

export function fetchData(url){  
  return axios.get(url)  
}

