import type { IMovie } from "../../interfaces/Imovie"

type MovieProps = {
  movie: IMovie;
};

const Movie = ({ movie }: MovieProps) => {
  return (
    <div>Movie name: {movie.title}</div>
  );
};

export default Movie;