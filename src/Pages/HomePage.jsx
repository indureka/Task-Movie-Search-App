import React, { useContext, useState, useEffect } from "react";
import { MovieContext } from "../Context/MovieContext";
import MovieGrid from "../components/MovieGrid";
import SearchBar from "../components/SearchBar";

const HomePage = ({ totalPages, handlePrevPage, handleNextPage }) => {
  const { fetchMovies, movies, totalResults } = useContext(MovieContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [movieType, setMovieType] = useState(""); // For dropdown filter
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch movies when searchTerm, movieType, or currentPage changes
  useEffect(() => {
    if (searchTerm) {
      fetchMovies(searchTerm, currentPage, movieType);
    }
  }, [searchTerm, currentPage, movieType, fetchMovies]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to the first page on a new search
  };

  const handleFilterChange = (type) => {
    setMovieType(type);
    setCurrentPage(1); // Reset to the first page when the filter changes
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6">
      {/* Search Bar */}
      <SearchBar
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        selectedType={movieType}
        filterOptions={[
          { value: "", label: "All" },
          { value: "movie", label: "Movies" },
          { value: "series", label: "Series" },
          { value: "episode", label: "Episodes" },
        ]}
      />

      {/* Movies Grid */}
      <MovieGrid movies={movies} />

      {/* Message for No Results */}
      {searchTerm && movies.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No movies found for "{searchTerm}". Try a different search term or
          filter.
        </p>
      )}
    </div>
  );
};

export default HomePage;
