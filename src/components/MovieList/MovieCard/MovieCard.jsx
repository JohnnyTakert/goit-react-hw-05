import { Link, useLocation } from 'react-router-dom';
import css from './MovieCard.module.css';

const defaultImg =
  'https://cs8.pikabu.ru/post_img/big/2016/02/04/7/145458292112119207.jpg';

export default function MovieCard({ poster, title, id }) {
  const location = useLocation();
  const posterUrl = poster
    ? `https://image.tmdb.org/t/p/w500${poster}`
    : defaultImg;

  return (
    <Link
      to={`/movies/${id}`}
      state={{ from: location.pathname }}
      className={css.card}
    >
      <img
        className={css.movieImg}
        src={posterUrl}
        alt={title || 'No title available'}
      />
      <p className={css.title}>{title || 'Unknown movie'}</p>
    </Link>
  );
}
