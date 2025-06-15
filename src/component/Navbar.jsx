"use client";
import { Link, useLocation } from "react-router";
import { useState } from "react"; // Added useState for mobile menu toggle

export default function Navbar(props) {
  const { user, handelLogout } = props;
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Newsletter Bar */}
      <div className="bg-black text-white py-3 px-4 flex items-center justify-center relative">
        <p className="text-sm">
          Get weekly updates with our{" "}
          <a href="#newsletter" className="underline hover:no-underline">
            Newsletter
          </a>
        </p>
        <button className="absolute right-4 hover:opacity-70">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Header */}
      <header className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-black">
            Wordcraft
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`transition-colors ${
                location.pathname === "/"
                  ? "text-black font-semibold"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              Home
            </Link>
            <Link
              to="/post"
              className={`transition-colors ${
                location.pathname === "/post"
                  ? "text-black font-semibold"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              Posts
            </Link>
            <a
              href="#categories"
              className="text-gray-700 hover:text-black transition-colors"
            >
              Categories
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-black transition-colors"
            >
              About
            </a>
            <div className="flex items-center space-x-1">
              <a
                href="#pages"
                className="text-gray-700 hover:text-black transition-colors"
              >
                Pages
              </a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-700"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </nav>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {!user && (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-black transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-black text-white hover:bg-gray-800 rounded-full px-6 py-2 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
            {user && (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-black transition-colors">
                  <span>{user.name}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black transition-colors">
                      Profile
                    </button>
                    <button
                      onClick={handelLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMobileMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col space-y-4">
              <Link
                to="/"
                className={`transition-colors ${
                  location.pathname === "/"
                    ? "text-black font-semibold"
                    : "text-gray-700 hover:text-black"
                }`}
                onClick={toggleMobileMenu}
              >
                Home
              </Link>
              <Link
                to="/post"
                className={`transition-colors ${
                  location.pathname === "/post"
                    ? "text-black font-semibold"
                    : "text-gray-700 hover:text-black"
                }`}
                onClick={toggleMobileMenu}
              >
                Posts
              </Link>
              <a
                href="#categories"
                className="text-gray-700 hover:text-black transition-colors"
                onClick={toggleMobileMenu}
              >
                Categories
              </a>
              <a
                href="#about"
                className="text-gray-700 hover:text-black transition-colors"
                onClick={toggleMobileMenu}
              >
                About
              </a>
              <a
                href="#pages"
                className="text-gray-700 hover:text-black transition-colors"
                onClick={toggleMobileMenu}
              >
                Pages
              </a>
              {!user && (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-black transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-gray-700 hover:text-black transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    Register
                  </Link>
                </>
              )}
              {user && (
                <>
                  <button
                    className="text-left text-gray-700 hover:text-black transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    Profile
                  </button>
                  <button
                    className="text-left text-gray-700 hover:text-black transition-colors"
                    onClick={() => {
                      handelLogout();
                      toggleMobileMenu();
                    }}
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
