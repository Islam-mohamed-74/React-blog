import React from "react";
import { Link, useLocation } from "react-router";

export default function Navbar(props) {
  const { user, handelLogout } = props;
  const location = useLocation();

  return (
    <header className="bg-white shadow-md w-full border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="navbar flex justify-between items-center p-0">
          <div className="navbar-start">
            <Link
              to="/"
              className={`btn btn-ghost text-lg font-semibold transition-colors duration-300 rounded-md ${
                location.pathname === "/"
                  ? "bg-indigo-100 text-indigo-700"
                  : "hover:bg-indigo-600 hover:text-white"
              }`}
            >
              Home
            </Link>
            <Link
              to="/post"
              className={`btn btn-ghost text-lg  font-semibold transition-colors duration-300 rounded-md ml-4 ${
                location.pathname === "/post"
                  ? "bg-indigo-100 text-indigo-700 "
                  : "hover:bg-indigo-600 hover:text-white"
              }`}
            >
              Post
            </Link>
          </div>

          <div className="navbar-end">
            {!user && (
              <Link
                to="/login"
                className="btn btn-ghost text-sm font-medium hover:bg-indigo-600 hover:text-white transition-colors duration-300 rounded-md mx-2"
              >
                Login
              </Link>
            )}
            {!user && (
              <Link
                to="/register"
                className="btn btn-ghost text-sm font-medium hover:bg-indigo-600 hover:text-white transition-colors duration-300 rounded-md mx-2"
              >
                Register
              </Link>
            )}
            {user && (
              <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                  <li>
                    <details>
                      <summary className="btn btn-ghost font-medium text-sm hover:bg-indigo-600 hover:text-white rounded-md">
                        {user.name}
                      </summary>
                      <ul className="bg-white rounded-md shadow-lg p-2 mt-2 space-y-1 z-10">
                        <li>
                          <button className="btn btn-ghost w-full text-left hover:bg-indigo-100 hover:text-indigo-700 rounded-md">
                            Profile
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={handelLogout}
                            className="btn btn-ghost w-full text-left hover:bg-indigo-100 hover:text-indigo-700 rounded-md"
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </details>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
