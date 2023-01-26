import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies]= useState([])
  const [isLoading, setIstLoading]= useState(false);
  //동기화 코드
  // const fetchMoviesHandler = ()=>{
  //   fetch('https://swapi.dev/api/films/')
  //   .then((res)=>{
  //     return res.json()
  //   }).then((data)=>{
  //     const transformedMovies = data.results.map(movieData=>{
  //       return{
  //         id: movieData.episode_id,
  //         title: movieData.title,
  //         openingText: movieData.opening_crawl,
  //         releaseDate: movieData.release_date
  //       }
  //     })
  //     setMovies(transformedMovies)
  //   })
  // }

  //비동기화 코드
  const fetchMoviesHandler =  async ()=>{
    setIstLoading(true);
    const res=await fetch('https://swapi.dev/api/films/');
    const data= await res.json();
        const transformedMovies = data.results.map(movieData=>{
        return{
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        }
      })
      setMovies(transformedMovies)
      setIstLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {~isLoading && movies.length>0 &&<MoviesList movies={movies} />}
        {!isLoading && movies.length===0 && <p>Found no movies</p>}
        {isLoading && <p>Loading...</p>}
        
      </section>
    </React.Fragment>
  );
}

export default App;
