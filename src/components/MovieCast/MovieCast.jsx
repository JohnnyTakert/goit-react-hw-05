import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieInfo } from '../../service/Api';
import Loader from '../Loader/Loader';
import css from './MovieCast.module.css';
import Section from '../Section/Section';
import Container from '../Container/Container';

const defaultImg =
  'https://cs8.pikabu.ru/post_img/big/2016/02/04/7/145458292112119207.jpg';

const MovieCast = () => {
  const { movieId } = useParams();
  const addUrl = 'credits';
  const [actors, setActors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getMovieInfo(movieId, addUrl);
        if (data && data.cast) {
          setActors(data.cast);
        } else {
          setError('No data about actors for this movie');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [movieId, addUrl]);

  return (
    <Section>
      <Container>
        {isLoading && <Loader />}
        {error && <p className={css.error}>{error}</p>}
        {actors.length > 0 && (
          <ul className={css.actorsList}>
            {actors.map(actor => (
              <li key={actor.cast_id} className={css.card}>
                <img
                  className={css.movieImg}
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                      : defaultImg
                  }
                  alt={actor.name}
                />
                <p className={css.title}>{actor.name}</p>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </Section>
  );
};

export default MovieCast;
