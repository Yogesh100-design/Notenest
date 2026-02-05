import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  let location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token"); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          ✍️ <span className="ml-2">NoteNest</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav mr-auto">
            {isLoggedIn && (
              <>
                <li
                  className={`nav-item ${
                    location.pathname === "/notes" ? "active fw-bold text-warning" : ""
                  }`}
                >
                  <Link className="nav-link" to="/notes">
                    Home <span className="sr-only">(current)</span>
                  </Link>
                </li>

                <li
                  className={`nav-item ${
                    location.pathname === "/about" ? "active fw-bold text-warning" : ""
                  }`}
                >
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                </li>
              </>
            )}
          </ul>

          {isLoggedIn && (
            <form className="form-inline my-2 my-lg-0 mr-3">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search notes..."
                aria-label="Search"
              />
              <button className="btn btn-outline-light my-2 my-sm-0" type="submit">
                🔍
              </button>
            </form>
          )}

          {!isLoggedIn ? (
            <form>
              <Link className="btn btn-outline-light mx-1" to="/login" role="button">
                Login
              </Link>
              <Link className="btn btn-light text-primary mx-1" to="/signup" role="button">
                Signup
              </Link>
            </form>
          ) : (
            <button
              className="btn btn-danger mx-1"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
