import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Nav.css";

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogIn = () => {
    setIsLoggedIn(true);
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <nav className="nav-bar-container">
      {!isLoggedIn ? (
        <div className="menu-wrapper">
          <Link to="/">
            <img src={logo} alt="homeswap-logo" className="logo" />
          </Link>
          <ul className="nav-menu">
            <Link to="/login">
              <button onClick={handleLogIn} className="log-in-btn">
                Log in
              </button>
            </Link>
            <Link to="/user/signup">
              <button className="sign-up-btn">Sign up</button>
            </Link>
          </ul>
        </div>
      ) : (
        <div className="menu-wrapper">
          <ul className="nav-menu">
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/">
              {" "}
              {/* this route should be /about but since we don't have the homepage yet this will do for now */}
              <li>About Us</li>
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
        </div>
      )}
    </nav>
  );
};

export default Nav;
