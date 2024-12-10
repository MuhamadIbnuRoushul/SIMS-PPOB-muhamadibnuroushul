import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white p-5 fixed w-full z-50 top-0 left-0 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo dan Judul */}
        <div className="flex items-center space-x-4">
          <img
            src="./src/assets/Website Assets/logo.png" // Pastikan path ini benar
            alt="Logo PPOB"
            className="w-12 h-12"
          />
          <Link to="/home" className="hover:text-red-500 text-black text-2xl font-semibold">
            SIMS PPOB
          </Link>
        </div>

        {/* Tombol Hamburger untuk mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-black">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Menu Navigasi */}
        <div className="hidden md:flex space-x-6 text-black font-semibold">
          <Link to="/top-up" className="hover:text-red-500">Top Up</Link>
          <Link to="/transaction" className="hover:text-red-500">Transaction</Link>
          <Link to="/account" className="hover:text-red-500">Akun</Link>
        </div>
      </div>

      {/* Mobile menu, ditampilkan saat isMenuOpen true */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 py-4">
          <Link to="/top-up" className="text-black hover:text-gray-200">Top Up</Link>
          <Link to="/transaction" className="text-black hover:text-gray-200">Transaction</Link>
          <Link to="/account" className="text-black hover:text-gray-200">Akun</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
