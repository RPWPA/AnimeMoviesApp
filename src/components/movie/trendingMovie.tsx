import type { ITrendingMovie } from "../../interfaces/ITrendingMovie";

interface TrendingMovieProps {
    trendingMovie: ITrendingMovie;
    index: number;
}

const TrendingMovie = ({ trendingMovie, index }: TrendingMovieProps) => {
    return (
      <div className="relative flex flex-col items-center w-full sm:w-32 md:w-36 lg:w-40 xl:w-44 mx-0 sm:mx-4 overflow-visible"> {/* responsive width and margin */}
        {/* Responsive oversized number behind image */}
        <span
          className="absolute top-0 
            left-[-3rem] sm:left-[-3rem] md:left-[-3.5rem] lg:left-[-4rem] xl:left-[-4.5rem]
            text-[6rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] xl:text-[14rem]
            text-white/10 font-extrabold z-0 leading-none select-none pointer-events-none"
        >
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
