import { useEffect, useRef, useState } from 'react'
import './App.css'
import Search from './components/search/search'
import Movie from './components/movie/movie';
import type { IMovie } from './interfaces/Imovie';

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [animeMovies, setAnimeMovies] = useState<IMovie[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isloading, setIsloading] = useState<boolean>(true);

  const errRef = useRef<HTMLDivElement>(null); // Optional typing

  useEffect(() => {
    const fetchAnimeMovies = async () => {
      try {
        const res = await fetch("https://api.jikan.moe/v4/anime?type=movie");

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        console.log(data)
        setAnimeMovies(data.data);
        setIsloading(false)
      }
      catch (err: any) {
        console.error(err);
        setErrorMessage(err.message || "Something went wrong");
        errRef.current?.focus();
        setIsloading(false)
      }
    };

    fetchAnimeMovies();
  }, []);

  return (
    <main>
      <div className="pattern"></div>
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt='hero image' />
          <h1>Find your favorite anime <span className='text-gradient'>movies</span></h1>
        </header>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <section className='all-movies'>
          <h2>All Movies</h2>
          {isloading ? "Loading..." :
            <>
              {errorMessage ? <p className='text-red-500' ref={errRef}>Error message: {errorMessage}</p> : null}
              {
                animeMovies.length > 0
                  ? animeMovies.map(movie => (
                    <Movie key={movie.title} movie={movie} />
                  ))
                  : null
              }
            </>
          }
        </section>
      </div>
    </main >
  )
}

export default App
