import React, { useState } from "react";
import PropTypes from "prop-types";
import { FavoritesContext } from "./FavouritesContext";

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Add a movie to favorites
  const addToFavorites = (movie) => {
    if (!favorites.some((fav) => fav.imdbID === movie.imdbID)) {
      setFavorites((prevFavorites) => [...prevFavorites, movie]);
    }
  };

  const removeFromFavorites = (movieID) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = [];
      for (let i = 0; i < prevFavorites.length; i++) {
        if (prevFavorites[i].imdbID !== movieID) {
          updatedFavorites.push(prevFavorites[i]); // Add to updatedFavorites if it's not the movie to remove
        }
      }
      console.log("Removing movie with ID:");
      console.log("Updated Favorites in Provider:");
      return updatedFavorites; // Return the updated array
    });
  };

  // Check if a movie is already in favorites
  const isFavorite = (movieID) => {
    return favorites.some((movie) => movie.imdbID === movieID);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// PropTypes for FavoritesProvider
FavoritesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FavoritesProvider;
