import { NavLink, Outlet } from 'react-router-dom';
import css from './MovieDetailsCard.module.css';
const defaultImg =
  'https://cs8.pikabu.ru/post_img/big/2016/02/04/7/145458292112119207.jpg';
const MovieDetailsCard = ({ movie }) => {
  return (
    <>
      <div className={css.box}>
        <img
          className={css.movieImg}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : defaultImg
          }
          alt={movie.title}
        />
        <div className="textPart">
          <h2 className={css.title}>{movie.title}</h2>
          <h3 className={css.headers}>
            Release Date
            <p className={css.span}>{movie.release_date}</p>
          </h3>
          <h3 className={css.headers}>
            UserScore:
            <p className={css.scoreSpan}>
              {(movie.vote_average * 10).toFixed(1)}%
            </p>
          </h3>
          <h3 className={css.headers}>
            Overview
            <p className={css.span}>{movie.overview}</p>
          </h3>
          <h3 className={css.headers}>
            Genres
            <p className={css.span}>
              {movie.genres.map(item => item.name + ', ')}
            </p>
          </h3>
        </div>
      </div>
      <div>
        <p className={css.addInfo}>Additional Information</p>
        <ul className={css.list}>
          <NavLink to="cast">
            <li className={css.item}>Cast</li>
          </NavLink>
          <NavLink to="reviews">
            <li className={css.item}>Reviews</li>
          </NavLink>
        </ul>
        <Outlet />
      </div>
    </>
  );
};
export default MovieDetailsCard;
