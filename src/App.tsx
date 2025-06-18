import { useEffect, useRef, useState } from 'react'
import './App.css'
import Search from './components/search/search'
import Movie from './components/movie/movie';
import type { IMovie } from './interfaces/Imovie';
import { useDebounce } from 'react-use';
import { updateSearchCount } from './appwrite';

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [animeMovies, setAnimeMovies] = useState<IMovie[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isloading, setIsloading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");

  const errRef = useRef<HTMLDivElement>(null); // Optional typing

  useDebounce(() => {setDebouncedSearchTerm(searchTerm)}, 500, [searchTerm])

  useEffect(() => {
    const fetchAnimeMovies = async () => {
      try {
        setIsloading(true);

        const searchQuery = debouncedSearchTerm
          ? `&q=${encodeURIComponent(debouncedSearchTerm)}`
          : "";

        const res = await fetch(
          `https://api.jikan.moe/v4/anime?type=movie&page=${currentPage}${searchQuery}`
        );

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        const safeMovies = data.data.filter(
          (movie: IMovie) => !movie.rating?.startsWith("R")
        );

        setAnimeMovies(safeMovies);
        setHasNextPage(data.pagination?.has_next_page);
        // save trending movie
        if(searchTerm && data.data?.length > 0){
          updateSearchCount(searchTerm, safeMovies[0]);
        }
      } catch (err: any) {
        console.error(err);
        setErrorMessage(err.message || "Something went wrong");
        errRef.current?.focus();
      } finally {
        setIsloading(false);
      }
    };

    fetchAnimeMovies();
  }, [currentPage, debouncedSearchTerm]);



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
          {isloading ? <p className='text-white'>Loading...</p> :
            <>
              {errorMessage ? <p className='text-red-500' ref={errRef}>Error message: {errorMessage}</p> : null}
              {
                animeMovies.length > 0
                  ? animeMovies.map(movie => (
                    <Movie key={movie.title} movie={movie} />
                  ))
                  : null
              }
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-40"
                >
                  Previous
                </button>

                <button
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={!hasNextPage}
                  className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </>
          }
        </section>
      </div>
    </main >
  )
}

export default App
