import { useContext, useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router";

import { useTheme } from "../Context/ThemeContext";
import ThemeToggle from "./ThemeToggle/ThemeToggle";
import AuthContext from "../Context/AuthContext";
import Loader from "./Loader";

function Navbar() {
  const { darkMode } = useTheme();
  const { user, signOut, loading } = useContext(AuthContext);

  const [openDropdown, setOpenDropdown] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
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

  // Handle mobile menu body scroll lock
  useEffect(() => {
    if (openMobileMenu) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }

    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [openMobileMenu]);

  const closeMobileMenu = () => {
    setOpenMobileMenu(false);
  };

  // Navigation items based on authentication state
  const getNavItems = () => {
    if (user && !loading) {
      // Logged in: 6 routes
      return [
        { to: "/", label: "Home" },
        { to: "/all-models", label: "Explore" },
        { to: "/add-model", label: "Dashboard" }, // Maps to add model functionality
        { to: "/my-models", label: "My Models" },
        { to: "/purchase", label: "Purchases" },
      ];
    } else {
      // Logged out: 4 routes  
      return [
        { to: "/", label: "Home" },
        { to: "/all-models", label: "Explore" },
        { to: "#about", label: "About" }, // Will scroll to about section
        { to: "/login", label: "Login" },
      ];
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 z-50 w-full border-b backdrop-blur-xl transition-all duration-300 ${
          darkMode
            ? "border-white/10 bg-black/30 text-white"
            : "border-black/10 bg-white/40 text-black"
        }`}
        data-theme={darkMode ? "dark" : "light"}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-black">
            Neural
            <span
              className={
                darkMode ? "text-cyan-400" : "text-blue-600"
              }
            >
              Stack
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden gap-8 md:flex">
            {getNavItems().slice(0, 3).map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="hover:text-primary-brand transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Hamburger Button for Mobile (< 768px) */}
          <div className="md:hidden">
            <button
              onClick={() => setOpenMobileMenu(!openMobileMenu)}
              className="hamburger-icon focus:outline-none p-1 touch-target"
              aria-label="Toggle navigation menu"
              aria-expanded={openMobileMenu}
              style={{
                minWidth: "44px",
                minHeight: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className={`hamburger-icon ${openMobileMenu ? "open" : ""}`}>
                <div className="hamburger-line"></div>
                <div className="hamburger-line"></div>
                <div className="hamburger-line"></div>
              </div>
            </button>
          </div>

          {/* Right Side - Theme Toggle and User Menu */}
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
                  className="h-11 w-11 cursor-pointer rounded-full border-2 border-cyan-400 object-cover touch-target"
                  style={{ minWidth: "44px", minHeight: "44px" }}
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
                        className={`rounded-xl px-4 py-3 transition-all duration-300 touch-target ${
                          darkMode ? "hover:bg-white/10" : "hover:bg-black/5"
                        }`}
                        style={{ minHeight: "44px" }}
                      >
                        Model Purchase
                      </Link>

                      <Link
                        to="/my-models"
                        className={`rounded-xl px-4 py-3 transition-all duration-300 touch-target ${
                          darkMode ? "hover:bg-white/10" : "hover:bg-black/5"
                        }`}
                        style={{ minHeight: "44px" }}
                      >
                        My Models
                      </Link>
                      <button
                        onClick={() => signOut()}
                        className={`rounded-xl px-4 py-3 transition-all duration-300 text-left touch-target ${
                          darkMode ? "hover:bg-white/10" : "hover:bg-black/5"
                        }`}
                        style={{ minHeight: "44px" }}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : !loading ? (
              <NavLink
                to="/login"
                className={`rounded-xl px-5 py-2 font-bold transition-all duration-300 touch-target ${
                  darkMode
                    ? "bg-cyan-400 text-black hover:bg-cyan-300"
                    : "bg-blue-600 text-white hover:bg-blue-500"
                }`}
                style={{ minHeight: "44px" }}
              >
                Login
              </NavLink>
            ) : null}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`hamburger-overlay ${openMobileMenu ? "open" : ""} md:hidden`}
        onClick={closeMobileMenu}
        aria-hidden={!openMobileMenu}
      />

      {/* Mobile Slide-out Menu */}
      <div
        className={`hamburger-menu ${openMobileMenu ? "open" : ""} md:hidden`}
        data-theme={darkMode ? "dark" : "light"}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-xl font-black">
            Neural
            <span className={darkMode ? "text-cyan-400" : "text-blue-600"}>
              Stack
            </span>
          </div>
          <button
            onClick={closeMobileMenu}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 touch-target"
            aria-label="Close menu"
            style={{ minWidth: "44px", minHeight: "44px" }}
          >
            ✕
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col mobile-gap">
          {getNavItems().map((item, index) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={closeMobileMenu}
              className={`mobile-spacing rounded-lg text-lg font-semibold transition-all duration-200 touch-target ${
                darkMode 
                  ? "hover:bg-white/10 text-white" 
                  : "hover:bg-black/5 text-black"
              }`}
              style={{ 
                minHeight: "44px",
                display: "flex",
                alignItems: "center",
                marginBottom: "8px"
              }}
            >
              {item.label}
            </Link>
          ))}
          
          {/* User Actions for Mobile */}
          {user && !loading && (
            <>
              <div className="border-t border-gray-200 dark:border-gray-700 my-4 pt-4">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={user?.photoURL}
                    alt="profile"
                    className="h-10 w-10 rounded-full border-2 border-cyan-400 object-cover"
                  />
                  <div>
                    <p className="font-semibold text-sm">{user.displayName}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
              </div>
              
              <Link
                to="/purchase"
                onClick={closeMobileMenu}
                className={`mobile-spacing rounded-lg font-semibold transition-all duration-200 touch-target ${
                  darkMode 
                    ? "hover:bg-white/10 text-white" 
                    : "hover:bg-black/5 text-black"
                }`}
                style={{ 
                  minHeight: "44px",
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "8px"
                }}
              >
                Model Purchase
              </Link>
              
              <button
                onClick={() => {
                  signOut();
                  closeMobileMenu();
                }}
                className={`mobile-spacing rounded-lg font-semibold transition-all duration-200 text-left touch-target ${
                  darkMode 
                    ? "hover:bg-white/10 text-white" 
                    : "hover:bg-black/5 text-black"
                }`}
                style={{ 
                  minHeight: "44px",
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "8px"
                }}
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </>
  );
}

export default Navbar;
