import { useEffect, useState } from 'react';
import { fetchMovies } from '../service/Api';
import Loader from '../components/Loader/Loader.jsx';
import { Heading } from '../components/Heading/Heading.jsx';
import Section from '../components/Section/Section.jsx';
import Container from '../components/Container/Container.jsx';
import MovieList from '../components/MovieList/MovieList.jsx';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchMovies();
        // console.log('Fetched data:', data);

        if (!data?.results || data.results.length === 0) {
          throw new Error('No movies found');
        }

        setMovies(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Section>
      <Container>
        {isLoading && <Loader />}
        {error && <Heading title={`Error: ${error}`} />}
        <h2>Trending films today</h2>
        {!isLoading && movies.length > 0 && <MovieList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && (
          <Heading title="No movies available today, try again..." />
        )}
      </Container>
    </Section>
  );
};

export default HomePage;
