import { useLocation } from 'react-router-dom';
import MovieCard from './MovieCard/MovieCard';
import css from './MovieList.module.css';

export default function MovieList({ movies = [] }) {
  const location = useLocation();

  return (
    <ul className={css.box}>
      {movies.map(movie => (
        <li key={movie.id} className={css.movieItem}>
          <MovieCard
            poster={movie.poster_path}
            title={movie.title}
            id={movie.id}
            location={location}
          />
        </li>
      ))}
    </ul>
  );
}
