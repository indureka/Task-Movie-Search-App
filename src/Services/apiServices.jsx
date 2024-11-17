

const API_URL = 'https://www.omdbapi.com/';
export const API_KEY = "19f869f7"; // Replace with your OMDB API key

console.log(API_KEY);

// Function to fetch movies based on search term and page
export const fetchMovies = async (searchTerm, page = 1) => {
  const url = `${API_URL}?s=${searchTerm}&page=${page}&apikey=${API_KEY}`;
  console.log('Fetching movies with URL:');
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.Response === 'True') {
      return data.Search; // Array of movie objects
    } else {
      throw new Error(data.Error); // Error message from OMDB API
    }
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error; // Re-throw the error to be handled in the calling component
  }
};

// Function to fetch detailed information for a specific movie
export const fetchMovieDetails = async (imdbID) => {
  const url = `${API_URL}?i=${imdbID}&apikey=${API_KEY}`;
  console.log('Fetching movie details with URL:');  // Debugging the URL
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.Response === 'True') {
      return data; // Detailed movie data
    } else {
      throw new Error(data.Error);
    }
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

// Function to fetch movies based on type (e.g., movie, series, episode)
export const fetchMoviesByType = async (searchTerm, type = 'movie', page = 1) => {
  const url = `${API_URL}?s=${searchTerm}&type=${type}&page=${page}&apikey=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.Response === 'True') {
      return data.Search; // Array of movie objects
    } else {
      throw new Error(data.Error); // Error message from OMDB API
    }
  } catch (error) {
    console.error('Error fetching movies by type:', error);
    throw error;
  }
};
