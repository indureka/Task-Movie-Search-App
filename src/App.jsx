import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MovieProvider } from "./Context/MovieContext";
import HomePage from "./Pages/HomePage";
import MovieDetails from "./Pages/MovieDetails";
import FavoritesPage from "./Pages/FavouritesPage";
import FavoritesProvider from "./Context/FavouritesProvider";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <MovieProvider>
      <FavoritesProvider>
        <Router>
          <Navbar />
          <div className="App">
            <Routes>
              {/* Home Page Route */}
              <Route path="/" element={<HomePage />} />

              {/* Movie Details Page Route */}
              <Route path="/movie/:imdbID" element={<MovieDetails />} />

              {/* Favorites Page Route */}
              <Route path="/favorites" element={<FavoritesPage />} />
            </Routes>
          </div>
        </Router>
      </FavoritesProvider>
    </MovieProvider>
  );
};

export default App;
