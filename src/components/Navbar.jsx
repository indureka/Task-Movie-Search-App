import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h3 className="text-xl font-bold text-yellow-400"> 🎥 Movie App</h3>
        <Link to="/movie/:imdbID" >
         
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-yellow-400">
            Home
          </Link>
          <Link to="/favorites" className="hover:text-yellow-400">
            Favorites
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
