import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MovieContext } from '../Context/MovieContext';

const MovieDetails = () => {
  const { fetchMovieDetails } = useContext(MovieContext);
  const { imdbID } = useParams(); // Get the movie ID from the URL parameters
  const navigate = useNavigate(); // For navigation (e.g., back to home page)
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
// Get the movie ID from the URL
    console.log('Extracted imdbID from URL:', imdbID);
    console.log('useParams output:', useParams()); 

  useEffect(() => {

    if (!imdbID) {
        console.error('Invalid imdbID. Ensure route and navigation logic are correct.');
        setError('Invalid movie ID. Unable to fetch details.');
        return;
      }

    const getMovieDetails = async () => {
        console.log('Fetching movie details for ID:', imdbID); // Debug
      try {
        const data = await fetchMovieDetails(imdbID);
        setMovie(data);
        setError(null); // Reset error if the fetch is successful
      } catch (err) {
        setError('Failed to fetch movie details. Please select a movie and try again.');
        setMovie(null);
      }
    };

    getMovieDetails();
  }, [imdbID, fetchMovieDetails]);

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (!movie) {
    return <p className="p-6 text-center text-gray-500">Loading movie details...</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button
        onClick={() => navigate('/')}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Back to Home
      </button>

      <div className="flex flex-col lg:flex-row items-start gap-6">
        {/* Movie Poster */}
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'}
          alt={movie.Title}
          className="w-full lg:w-1/3 rounded"
        />

        {/* Movie Details */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-4">{movie.Title}</h1>
          <p className="text-gray-700 mb-2">
            <strong>Year:</strong> {movie.Year}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Genre:</strong> {movie.Genre || 'Not Available'}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Director:</strong> {movie.Director || 'Not Available'}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Actors:</strong> {movie.Actors || 'Not Available'}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Plot:</strong> {movie.Plot || 'Not Available'}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>IMDB Rating:</strong> {movie.imdbRating}/10
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Runtime:</strong> {movie.Runtime || 'Not Available'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
