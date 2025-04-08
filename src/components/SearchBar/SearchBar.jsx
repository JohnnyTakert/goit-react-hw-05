import { useSearchParams } from 'react-router-dom';
import css from './SearchBar.module.css';
import { useState } from 'react';

const SearchBar = ({ onSubmit }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = e => {
    setSearchQuery(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    searchParams.set('query', searchQuery);
    setSearchParams(searchParams);
    // console.log('searchParams');
    // console.log(searchParams);
    if (!searchQuery.trim()) {
      <p>Input please</p>;
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <div className={css.searchBox}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          value={searchQuery}
          onChange={handleChange}
          placeholder="Search movie"
          className={css.searchInput}
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>
    </div>
  );
};
export default SearchBar;
