import React, { useContext } from 'react';
import { MovieContext } from '../Context/MovieContext';
import MovieCard from './MovieCard';

const FavoritesList = () => {
  const { favorites, removeFromFavorites } = useContext(MovieContext);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Favorite Movies</h2>

      {favorites.length === 0 ? (
        <p className="text-gray-600">You have no favorite movies yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.map((movie) => (
            <div key={movie.imdbID} className="relative">
              <MovieCard movie={movie} />

              {/* Remove from Favorites Button */}
              <button
                onClick={() => removeFromFavorites(movie.imdbID)}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList;
