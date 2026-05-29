import { useContext, useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router";

import { useTheme } from "../Context/ThemeContext";
import ThemeToggle from "./ThemeToggle/ThemeToggle";
import AuthContext from "../Context/AuthContext";
import Loader from "./Loader";

function Navbar() {
  const { darkMode } = useTheme();
  const { user,signOut,loading } = useContext(AuthContext);

  const [openDropdown, setOpenDropdown] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };

    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [openDropdown]);

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full border-b backdrop-blur-xl transition-all duration-300 ${
        darkMode
          ? "border-white/10 bg-black/30 text-white"
          : "border-black/10 bg-white/40 text-black"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
         <h1 className="text-2xl font-black">
            Neural
            <span
              className={
                darkMode
                  ? "text-cyan-400"
                  : "text-blue-600"
              }
            >
              Stack
            </span>
          </h1>

        {/* Links */}
        <div className="hidden gap-8 md:flex">
          <Link to="/">Home</Link>

          <Link to="/add-model">Add Model</Link>

          <Link to="/all-models">All Models</Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="text-2xl focus:outline-none"
          >
            {openMenu ? "✕" : "☰"}
          </button>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <ThemeToggle /> 

          {/* Loader when loading */}
          {loading && <Loader size="sm" />}

          {/* If Logged In */}
          {user && !loading ? (
            <div className="relative" ref={dropdownRef}>
              {/* Profile Image */}
              <img
                onClick={() => setOpenDropdown(!openDropdown)}
                src={user?.photoURL}
                alt="profile"
                className="h-11 w-11 cursor-pointer rounded-full border-2 border-cyan-400 object-cover"
              />

              {/* Dropdown */}
              {openDropdown && (
                <div
                  className={`absolute right-0 mt-4 w-72 rounded-2xl border p-5 shadow-2xl backdrop-blur-xl ${
                    darkMode
                      ? "border-white/10 bg-black/80"
                      : "border-black/10 bg-white/90"
                  }`}
                >
                  {/* User Info */}
                  <div className="border-b border-white/10 pb-4">
                    <h2 className="text-lg font-black">{user.displayName}</h2>

                    <p
                      className={`mt-1 text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {user.email}
                    </p>
                  </div>

                  {/* Links */}
                  <div className="mt-4 flex flex-col gap-3">
                    <Link
                      to="/purchase"
                      className={`rounded-xl px-4 py-3 transition-all duration-300 ${
                        darkMode ? "hover:bg-white/10" : "hover:bg-black/5"
                      }`}
                    >
                      Model Purchase
                    </Link>

                    <Link
                      to="/my-models"
                      className={`rounded-xl px-4 py-3 transition-all duration-300 ${
                        darkMode ? "hover:bg-white/10" : "hover:bg-black/5"
                      }`}
                    >
                      My Models
                    </Link>
                    <Link
                      onClick={()=>signOut() }
                      className={`rounded-xl px-4 py-3 transition-all duration-300 ${
                        darkMode ? "hover:bg-white/10" : "hover:bg-black/5"
                      }`}
                    >
                      Logout
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ) : !loading ? (
            <NavLink
                to="/login"
              className={`rounded-xl px-5 py-2 font-bold transition-all duration-300 ${
                darkMode
                  ? "bg-cyan-400 text-black hover:bg-cyan-300"
                  : "bg-blue-600 text-white hover:bg-blue-500"
              }`}
            >
              Login
            </NavLink>
          ) : null}
        </div>
      </div>

      {/* Mobile Menu */}
      {openMenu && (
        <div
          className={`border-t md:hidden ${
            darkMode
              ? "border-white/10 bg-black/30"
              : "border-black/10 bg-white/40"
          }`}
        >
          <div className="mx-auto px-4 py-3">
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                onClick={() => setOpenMenu(false)}
                className={`rounded-lg px-3 py-2 text-sm transition-all duration-300 ${
                  darkMode ? "hover:bg-white/10" : "hover:bg-black/5"
                }`}
              >
                Home
              </Link>

              <Link
                to="/add-model"
                onClick={() => setOpenMenu(false)}
                className={`rounded-lg px-3 py-2 text-sm transition-all duration-300 ${
                  darkMode ? "hover:bg-white/10" : "hover:bg-black/5"
                }`}
              >
                Add Model
              </Link>

              <Link
                to="/all-models"
                onClick={() => setOpenMenu(false)}
                className={`rounded-lg px-3 py-2 text-sm transition-all duration-300 ${
                  darkMode ? "hover:bg-white/10" : "hover:bg-black/5"
                }`}
              >
                All Models
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
