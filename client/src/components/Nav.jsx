import React, { useState } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // starts at false because we assume user is not logged in ** to be replaced with real data once we manage sessions **

  return (
    <ul>
      <Link to="/">
        <li>Logo</li>
      </Link>
      {/* Check if user is logged in to show different options than we show to guests */}
      {!isLoggedIn ? 
      <>
        <Link to="/signin">
          <li>Sign in</li>
        </Link>
        <Link to="/signup">
          <li>Sign up</li>
        </Link>
      </> : 
      <>
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
          <li>Log out</li>
        </Link>
      </> }
    </ul>
  );
};

export default Nav;
