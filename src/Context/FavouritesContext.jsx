import { createContext } from 'react';
import { useContext } from 'react';

// Create the FavoritesContext
export const FavoritesContext = createContext();

// Custom hook to use FavoritesContext
export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
      throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
  };
