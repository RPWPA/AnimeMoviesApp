import { useEffect, useRef, useState } from 'react'
import './App.css'
import Search from './components/search/search'
import Movie from './components/movie/movie';
import type { IMovie } from './interfaces/Imovie';
import { useDebounce } from 'react-use';
import { fetchTrendingMovies, updateSearchCount } from './appwrite';
import type { ITrendingMovie } from './interfaces/ITrendingMovie';
import TrendingMovie from './components/movie/trendingMovie';

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [animeMovies, setAnimeMovies] = useState<IMovie[]>([]);
  const [trendingAnimeMovies, setTrendingAnimeMovies] = useState<ITrendingMovie[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [areAllMoviesloading, setAreAllMoviesloading] = useState<boolean>(true);
  const [areTrendingMoviesLoading, setAreTrendingMoviesLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");

  const errRef = useRef<HTMLDivElement>(null); // Optional typing

  useDebounce(() => { setDebouncedSearchTerm(searchTerm) }, 500, [searchTerm])

  const fetchAnimeMovies = async () => {
    try {
      setAreAllMoviesloading(true);

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
      if (searchTerm && data.data?.length > 0) {
        updateSearchCount(searchTerm, safeMovies[0]);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Something went wrong");
      errRef.current?.focus();
    } finally {
      setAreAllMoviesloading(false);
    }
  };

  useEffect(() => {
    fetchAnimeMovies();
  }, [currentPage, debouncedSearchTerm]);

  const getTrendingMovies = async () => {
    setAreTrendingMoviesLoading(true);
    try {
      const trendingMovies: ITrendingMovie[] = await fetchTrendingMovies();
      setTrendingAnimeMovies(trendingMovies);
    }
    catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Something went wrong");
    }
    finally {
      setAreTrendingMoviesLoading(false);
    }
  }

  useEffect(() => {
    getTrendingMovies();
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

        <section className='error-message'>
          {errorMessage ? <p className='text-red-500' ref={errRef}>Error message: {errorMessage}</p> : null}
        </section>

        <section className="trending-movies flex flex-col items-center gap-8 py-10">
          {areTrendingMoviesLoading ? <p className='text-white'>Loading...</p> :
            <>
              <h2 className="text-white text-2xl font-bold">Trending Movies</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full">
                {trendingAnimeMovies.length > 0 &&
                  trendingAnimeMovies.map((movie, index) => (
                    <TrendingMovie key={movie.title} trendingMovie={movie} index={index} />
                  ))}
              </div>
            </>
          }
        </section>


        <section className='all-movies'>
          <h2>All Movies</h2>
          {areAllMoviesloading ? <p className='text-white'>Loading...</p> :
            <>
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