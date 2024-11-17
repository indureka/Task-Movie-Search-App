import React, { createContext, useState } from "react";
import { fetchMovies } from "../Services/apiServices";
import { fetchMovieDetails } from "../Services/apiServices";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);

  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState();

  const getMovies = async (searchTerm, page = 1) => {
    try {
      setMovies([]); // Clear previous movies immediately
      setError(null); // Clear any previous errors
      setLoading(true); // Show a loading spinner or similar if applicable

      const fetchedMovies = await fetchMovies(searchTerm, page); // API call
      setMovies(fetchedMovies); // Set new movies
      setTotalResults(fetchedMovies.length); // Update total results
    } catch (error) {
      setMovies([]); // Clear movies on error
      setError("No movies found. Try a different search term!"); // Set error message
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  return (
    <MovieContext.Provider
      value={{ movies, totalResults, getMovies, fetchMovieDetails, error }}
    >
      {children}
    </MovieContext.Provider>
  );
};
