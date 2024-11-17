import React, { useContext, useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { MovieContext } from "../Context/MovieContext";
import Pagination from "./Pagination";

const MovieGrid = () => {
  const { movies, fetchMovies, totalResults } = useContext(MovieContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch movies when the component mounts or search term changes
  useEffect(() => {
    if (searchTerm) {
      fetchMovies(searchTerm, currentPage);
    }
  }, [searchTerm, currentPage, fetchMovies]);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const totalPages = totalResults > 0 ? Math.ceil(totalResults / 10) : 1;

  console.log("Total Results:", totalResults);
  console.log("Calculated Total Pages:", totalPages);

  return (
    <div className="p-4">
      {/* Movies Grid */}

      {movies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No movies found. Try a different search term!
        </p>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
      />
    </div>
  );
};

export default MovieGrid;
