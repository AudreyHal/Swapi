import React from 'react';


const MovieIntro = ({ data }) => {
    return (
       
        <div className="MovieIntro">
          <div className="scrolling-text">
            <div className="movie-title ">{data.title}</div>
            <div className="crawl">{data.opening_crawl}</div>   
          </div>         
        </div> 
    )
};

export default MovieIntro ;