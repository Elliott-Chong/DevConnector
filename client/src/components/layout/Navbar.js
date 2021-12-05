import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/context";

const Navbar = () => {
  const {
    dispatch,
    state: { isAuthenticated, loading },
  } = useGlobalContext();
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to={`${isAuthenticated ? "/dashboard" : "/"}`}>
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      <ul>
        <li>
          <Link to="/profile">Developers</Link>
        </li>
        {!isAuthenticated && (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
        {isAuthenticated && !loading && (
          <>
            <li>
              <Link to="/dashboard">
                <i className="fas fa-user"></i>
                <span className="hide-sm">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
            <li>
              <Link to="/" onClick={() => dispatch({ type: "LOGOUT" })}>
                <i className="fas fa-sign-out-alt"></i>
                <span className="hide-sm">Logout</span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
