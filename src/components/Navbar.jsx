import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/images/logo.jpg";

const pageLinks = [
  {
    id: 1,
    path: "/",
    text: "home",
  },
  {
    id: 2,
    path: "/rooms",
    text: "rooms",
  },
  {
    id: 3,
    path: "/about",
    text: "about",
  },
  {
    id: 4,
    path: "/contact",
    text: "contact",
  },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    closeMenu();
  };

  return (
    <>
      <header className="glass-header sticky top-0 z-50 border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/">
              <img
                src="https://jissapartment.com/wp-content/uploads/2025/08/Folder-1-copy.png"
                className="w-25 logoimg"
                alt="Luxury Nigeria Logo"
              />
            </Link>
          </div>

          <ul className="hidden md:flex space-x-8 font-medium text-sm uppercase tracking-wide">
            {pageLinks.map(({ path, text, id }) => (
              <NavLink
                className="hover:text-mutedGold transition-colors"
                to={path}
                key={id}
              >
                {text}
              </NavLink>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-gray-200">
                  <div className="flex flex-col items-end">
                    <span
                      className="text-sm font-semibold"
                      style={{ color: "#8b5e3c" }}
                    >
                      {user?.name?.split(" ")[0]}
                    </span>
                    <span className="text-xs" style={{ color: "#6b6b6b" }}>
                      {isAdmin ? "Admin" : "User"}
                    </span>
                  </div>
                </div>
                <Link
                  className="text-sm font-semibold hover:text-luxuryBrown transition-colors"
                  to={isAdmin ? "/admin" : "/dashboard"}
                >
                  {isAdmin ? "Admin" : "Dashboard"}
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 border-2 border-luxuryBrown text-luxuryBrown rounded-full text-sm font-bold hover:bg-luxuryBrown hover:text-white transition-all"
                >
                  Logout
                </button>
              </>
            ) : null}
            <Link
              to="/booking"
              className="bg-mutedGold text-white px-6 py-2.5 rounded-full text-sm font-bold cursor-pointer shadow-lg hover:bg-opacity-90 transition-all"
            >
              Book Now
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-slate-800 shadow-sm transition hover:bg-gray-50"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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
        </nav>
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 flex bg-black/40 backdrop-blur-sm md:hidden">
            <button
              type="button"
              className="absolute inset-0 cursor-default"
              onClick={closeMenu}
              aria-label="Close menu overlay"
            />
            <div className="relative ml-auto h-full w-70 overflow-y-auto bg-white px-6 py-6 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <Link to="/" onClick={closeMenu}>
                  <img
                    src="https://jissapartment.com/wp-content/uploads/2025/08/Folder-1-copy.png"
                    className="w-24"
                    alt="Luxury Nigeria Logo"
                  />
                </Link>
                <button
                  type="button"
                  onClick={closeMenu}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-slate-900 hover:bg-gray-50"
                  aria-label="Close menu"
                >
                  ×
                </button>
              </div>
              <div className="space-y-6">
                <nav className="space-y-4 text-sm uppercase tracking-wide text-slate-800">
                  {pageLinks.map(({ path, text, id }) => (
                    <NavLink
                      key={id}
                      to={path}
                      onClick={closeMenu}
                      className="block py-3 font-semibold hover:text-mutedGold transition-colors"
                    >
                      {text}
                    </NavLink>
                  ))}
                </nav>
                <div className="space-y-4 border-t border-gray-200 pt-6">
                  {isAuthenticated ? (
                    <>
                      <div
                        className="px-4 py-3 rounded-lg text-sm"
                        style={{ backgroundColor: "#f5efe6" }}
                      >
                        <p
                          style={{ color: "#6b6b6b" }}
                          className="text-xs mb-1"
                        >
                          Logged in as
                        </p>
                        <p
                          style={{ color: "#8b5e3c" }}
                          className="font-semibold"
                        >
                          {user?.name}
                        </p>
                      </div>
                      <Link
                        to={isAdmin ? "/admin" : "/dashboard"}
                        onClick={closeMenu}
                        className="block rounded-full border border-luxuryBrown px-5 py-3 text-center text-sm font-bold text-luxuryBrown hover:bg-luxuryBrown hover:text-white transition-all"
                      >
                        {isAdmin ? "Admin Dashboard" : "My Dashboard"}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full rounded-full bg-luxuryBrown px-5 py-3 text-sm font-bold text-white shadow-lg shadow-luxuryBrown/20 hover:bg-opacity-90 transition-all"
                      >
                        Logout
                      </button>
                    </>
                  ) : null}
                  <Link
                    to="/booking"
                    onClick={closeMenu}
                    className="w-full block rounded-full bg-mutedGold px-5 py-3 text-center text-sm font-bold text-black shadow-lg shadow-mutedGold/20 hover:bg-opacity-90 transition-all"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
export default Navbar;
