import { Link, useLocation, useParams } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import Container from '../components/Container/Container';
import Section from '../components/Section/Section';
import { getMovieById } from '../service/Api';
import { Heading } from '../components/Heading/Heading';
import Loader from '../components/Loader/Loader';
import MovieDetailsCard from '../components/MovieDetailsCard/MovieDetailsCard';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLink = useRef(location.state?.from || '/movies'); // Улучшена обработка пути назад

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getMovieById(movieId);
        if (data) {
          setMovie(data);
        } else {
          setError('No movie found');
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
    <Section>
      <Container>
        {isLoading && <Loader />}
        {error && <Heading title={`Error: ${error}`} />}{' '}
        {/* Улучшенное отображение ошибки */}
        <Link to={backLink.current}>Back</Link>
        {movie && <MovieDetailsCard movie={movie} />}
      </Container>
    </Section>
  );
};

export default MovieDetailsPage;
