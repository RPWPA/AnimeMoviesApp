import type { ITrendingMovie } from "../../interfaces/ITrendingMovie";

interface TrendingMovieProps {
  trendingMovie: ITrendingMovie;
}

const TrendingMovie = ({ trendingMovie }: TrendingMovieProps) => {

  if (!trendingMovie) {
    return (
      <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="text-red-500">🔥</span>
          Trending Search
        </h2>
        <div className="text-center text-gray-400 py-8">
          <p>No trending search yet</p>
          <p className="text-sm">Start searching for anime movies to see trends!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="text-red-500">🔥</span>
        Trending Search
      </h2>
      
      <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer group">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              src={trendingMovie.image_url} 
              alt={trendingMovie.title}
              className="w-16 h-20 object-cover rounded-md"
            />
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              1
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold text-sm truncate group-hover:text-red-400 transition-colors">
              {trendingMovie.title}
            </h3>
            <p className="text-gray-400 text-xs mt-1">
              Searched {trendingMovie.count} times
            </p>
            <p className="text-gray-500 text-xs mt-1">
              "{trendingMovie.searchTerm}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrendingMovie