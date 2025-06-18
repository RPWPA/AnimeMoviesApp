import type { ITrendingMovie } from "../../interfaces/ITrendingMovie";

interface TrendingMovieProps {
    trendingMovie: ITrendingMovie;
    index: number;
}

const TrendingMovie = ({ trendingMovie, index }: TrendingMovieProps) => {
    return (
      <div className="relative flex flex-col items-center w-40 mx-4 overflow-visible"> {/* wider and allow overflow */}
        {/* Oversized number behind image, aligned and more left-shifted */}
        <span className="absolute top-0 left-[-4rem] text-[12rem] text-white/10 font-extrabold z-0 leading-none select-none pointer-events-none">
          {index + 1}
        </span>
  
        {/* Movie Poster */}
        <img
          src={trendingMovie.image_url}
          alt={trendingMovie.title}
          className="w-full h-auto rounded-md z-10 shadow-lg"
        />
      </div>
    );
  };
  

export default TrendingMovie;
