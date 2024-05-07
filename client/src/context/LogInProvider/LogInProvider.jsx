import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const LogInContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

const LogInProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <LogInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LogInContext.Provider>
  );
};

LogInProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useLogin = () => useContext(LogInContext);

export default LogInProvider;
