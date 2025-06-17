import type { IMovie } from "../../interfaces/Imovie";

type MovieProps = {
  movie: IMovie;
};

const Movie = ({ movie }: MovieProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 bg-gray-900 text-white rounded-xl p-4 shadow-lg hover:scale-[1.01] transition">
      <img
        src={movie.images.jpg.image_url}
        alt={movie.title_english || movie.title}
        className="w-full md:w-64 h-auto object-cover rounded-lg"
      />

      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">{movie.title_english || movie.title}</h2>
        <h3 className="text-sm text-gray-400">{movie.title}</h3>

        <div className="flex flex-wrap gap-4 text-sm text-gray-300">
          <span><strong>Rating:</strong> {movie.rating}</span>
          <span><strong>Score:</strong> ⭐ {movie.score}</span>
          <span><strong>Duration:</strong> {movie.duration}</span>
          <span><strong>Status:</strong> {movie.status}</span>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {movie.genres.map((genre, idx) => (
            <span
              key={idx}
              className="bg-gray-700 px-3 py-1 rounded-full text-xs"
            >
              {genre.name}
            </span>
          ))}
        </div>

        <p className="text-sm text-gray-300 mt-2">
          {movie.synopsis.length > 200
            ? movie.synopsis.slice(0, 200) + "..."
            : movie.synopsis}
        </p>
      </div>
    </div>
  );
};

export default Movie;
