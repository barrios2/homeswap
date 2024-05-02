import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // starts at false because we assume user is not logged in ** to be replaced with real data once we manage sessions **

  const handleSignIn = () => {
    setIsLoggedIn(true);
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <nav className="nav-bar-container">
      <Link to="/">
        <p>Logo</p>
      </Link>
      {/* Check if user is logged in to show different options than we show to guests */}
      {!isLoggedIn ? (
        <ul className="nav-menu">
          <Link to="/signin">
            <button onClick={handleSignIn} className="sign-in-btn">
              Sign in
            </button>
          </Link>
          <Link to="/signup">
            <button className="sign-up-btn">Sign up</button>
          </Link>
        </ul>
      ) : (
        <ul className="nav-menu">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/profile">
            <li>Profile</li>
          </Link>
          <Link to="/logout">
            <button onClick={handleLogOut} className="logout-btn">
              Log out
            </button>
          </Link>
        </ul>
      )}
    </nav>
  );
};

export default Nav;
