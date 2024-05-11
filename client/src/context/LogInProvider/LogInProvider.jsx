import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const LogInContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

const LogInProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // pre define form data fields
  const [formData, setFormData] = useState({
    title: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    postcode: "",
    homeType: "",
  });
  // pre define form fields for which we will need errors
  const [formErrors, setFormErrors] = useState({
    title: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    postcode: "",
    homeType: "",
  });

  return (
    <LogInContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        formData,
        setFormData,
        formErrors,
        setFormErrors,
      }}
    >
      {children}
    </LogInContext.Provider>
  );
};

LogInProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useLogin = () => useContext(LogInContext);

export default LogInProvider;
