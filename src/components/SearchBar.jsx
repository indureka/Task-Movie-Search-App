import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { MovieContext } from '../Context/MovieContext';

const SearchBar = ({ filterOptions }) => {
  const { fetchMovies } = useContext(MovieContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const { getMovies, error } = useContext(MovieContext);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  const handleSearch = () => {
    if (searchTerm) {
      getMovies(searchTerm, 1, selectedFilter);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center mb-6">

      {/* Search Input */}
      
      <input
        type="text"
        placeholder="Search for movies..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="border border-gray-300 rounded w-full md:w-2/3 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Filter Dropdown */}
      <select
        value={selectedFilter}
        onChange={handleFilterChange}
        className="border border-gray-300 rounded w-full md:w-1/3 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All</option>
        {filterOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="mt-2 md:mt-0 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Search
      </button>
    </div>
  );
};

SearchBar.propTypes = {
  filterOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SearchBar;                         