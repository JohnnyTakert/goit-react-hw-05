import css from './MovieList.module.css';
import MovieCard from './MovieCard/MovieCard';

export default function MovieList({ movies = [] }) {
  return (
    <ul className={css.box}>
      {movies.map(movie => (
        <li key={movie.id} className={css.movieItem}>
          <MovieCard
            poster={movie.poster_path}
            title={movie.title}
            id={movie.id}
          />
        </li>
      ))}
    </ul>
  );
}
