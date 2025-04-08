import { useEffect, useState } from 'react';
import Container from '../components/Container/Container';
import SearchBar from '../components/SearchBar/SearchBar';
import Section from '../components/Section/Section';
import Loader from '../components/Loader/Loader';
import MovieList from '../components/MovieList/MovieList';
import { getMoviebyName } from '../service/Api';
import { useLocation, useSearchParams } from 'react-router-dom';

const MoviePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getMoviebyName(query);
        // console.log('Fetched data:', data);

        if (!data?.results?.length) {
          throw new Error('No movies found.');
        }

        setMovies(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  const onHandleSubmit = searchQuery => {
    setSearchParams({ query: searchQuery });
    setMovies([]);
    setError(null);
  };

  return (
    <Section>
      <Container>
        <SearchBar onSubmit={onHandleSubmit} />
        {loading && <Loader />}
        {error && <p style={{ color: 'red' }}>{error}</p>}{' '}
        {movies.length > 0 && <MovieList state={location} movies={movies} />}
      </Container>
    </Section>
  );
};

export default MoviePage;
