import { useEffect, useState } from 'react'
import './App.css'
import Search from './components/search/search'
import Movie from './components/movie/movie';
import type { IMovie } from './interfaces/Imovie';

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [animeMovies, setAnimeMovies] = useState<IMovie[]>([]);
  useEffect(() => {
    fetch("https://api.jikan.moe/v4/anime?type=movie")
      .then(res => res.json())
      .then(data => {
        console.log(data.data);
        setAnimeMovies(data.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  return (
    <main>
      <div className="pattern"></div>
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt='hero image' />
          <h1>Find your favorite anime <span className='text-gradient'>movies</span></h1>
        </header>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <h1>{searchTerm}</h1>
        {
          animeMovies.length > 0
            ? animeMovies.map(movie => (
              <Movie key={movie.title} movie={movie} />
            ))
            : null
        }
      </div>
    </main>
  )
}

export default App
