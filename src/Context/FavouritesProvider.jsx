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

  // Remove movie from favorites
  const removeFromFavorites = (movieID) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter(
        (movie) => movie.imdbID !== movieID
      );
      console.log("Removing movie with ID:", movieID);
      console.log("Updated Favorites in Provider:", updatedFavorites);
      return [...updatedFavorites];
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
