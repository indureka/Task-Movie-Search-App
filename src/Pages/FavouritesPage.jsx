import React, { useContext } from "react";
import { FavoritesContext } from "../Context/FavouritesContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FavoritesPage = () => {
  const { favorites, removeFromFavorites } = useContext(FavoritesContext);
  const navigate = useNavigate();

  // Log favorites whenever it updates
  useEffect(() => {
    console.log("Updated Favorites in FavoritesPage:", favorites);
  }, [favorites]); // Dependency array to trigger useEffect on `favorites` change

  return (
    <div className="p-6">
      <button
        onClick={() => navigate("/")}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Back to Home
      </button>

      <h1 className="text-2xl font-bold mb-6">Your Favorite Movies</h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">
          You have no favorite movies yet. Add some from the search results!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((movie) => (
            <div
              key={movie.imdbID}
              className="relative border rounded shadow-md p-4"
            >
              {/* Movie Poster */}
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/150"
                }
                alt={movie.Title}
                className="w-full h-64 object-cover mb-4"
              />

              {/* Movie Title */}
              <h3 className="text-lg font-bold text-center mb-2">
                {movie.Title}
              </h3>

              {/* Movie Year */}
              <p className="text-gray-600 mb-4">{movie.Year}</p>

              {/* Remove Button */}

              <button
                onClick={() => removeFromFavorites(movie.imdbID)}
                className="bg-red-500 text-white px-3 py-2 rounded-full hover:bg-red-600"
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
