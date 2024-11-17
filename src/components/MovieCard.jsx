import React, { useState } from "react";
import PropTypes from "prop-types";
import { useFavorites } from "../Context/FavouritesContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { API_KEY } from "../Services/apiServices";

const MovieCard = ({ movie }) => {
  
const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

const [plot, setPlot] = useState("");

// description limit

const truncateText = (text, wordLimit) => {
    if (!text) return ""; // Handle undefined or empty text
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  // fetch description detail

  useEffect(() => {
    // Fetch detailed movie info to get the Plot
    const fetchPlot = async () => {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`
        );
        const data = await response.json();
        if (data && data.Plot) {
          setPlot(data.Plot); // Set the plot from the API response
        }
      } catch (error) {
        console.error("Error fetching movie plot:", error);
      }
    };

    fetchPlot();
  }, [movie.imdbID]);



  // Hook for navigation
  const navigate = useNavigate();

  const goToDetails = () => {
    navigate(`/movie/${movie.imdbID}`); // Navigate to MovieDetails page
  };

  return (
    <div className="border rounded shadow-md p-4 flex flex-col items-center">
      <img
        onClick={goToDetails}
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/150"
        }
        alt={movie.Title}
        className="w-full h-64 object-cover mb-4"
      />
      <h3 onClick={goToDetails}
      className="text-lg font-bold text-center mb-2">{movie.Title}</h3>

      <p onClick={goToDetails}
      className="text-gray-600 mb-4 p-4">{truncateText(plot, 10)}</p>
      <button
        onClick={() => addToFavorites(movie)}
        disabled={isFavorite(movie.imdbID)} // Pass imdbID to check if it's already a favorite
        className={`px-4 py-2 rounded ${
          isFavorite(movie.imdbID)
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        {isFavorite(movie.imdbID)
          ? "Remove from Favorites"
          : "Add to Favorites"}
      </button>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    imdbID: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    Poster: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieCard;
