import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieInfo } from '../../service/Api';
import Loader from '../Loader/Loader';
import css from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const addUrl = 'reviews';

  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return; // Проверяем наличие movieId перед загрузкой

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getMovieInfo(movieId, addUrl);
        if (data && data.results) {
          setReviews(data.results);
        } else {
          setError('No reviews available for this movie'); // Исправлено сообщение
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      {error && <p className={css.error}>{error}</p>} {/* Отображение ошибки */}
      {reviews.length === 0 && !error && <p>No reviews for this movie</p>}{' '}
      {/* Используем строгий оператор */}
      {reviews.length > 0 && (
        <ul className={css.list}>
          {reviews.map(item => (
            <li key={item.id} className={css.box}>
              <p>
                <span className={css.text}>Author: </span>
                {item.author}
              </p>
              <p>
                <span className={css.text}>Review: </span> {item.content}
              </p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MovieReviews;
