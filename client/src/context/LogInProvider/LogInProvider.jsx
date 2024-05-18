import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const LogInContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userId: null,
  setUserId: () => {},
  token: null,
  setToken: () => {},
});

const LogInProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

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

  const [firstScreenIsComplete, setFirstScreenIsComplete] = useState(false);
  const [secondScreenIsComplete, setSecondScreenIsComplete] = useState(false);
  const [thirdScreenIsComplete, setThirdScreenIsComplete] = useState(false);

  return (
    <LogInContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userId,
        setUserId,
        token,
        setToken,
        formData,
        setFormData,
        formErrors,
        setFormErrors,
        firstScreenIsComplete,
        setFirstScreenIsComplete,
        secondScreenIsComplete,
        setSecondScreenIsComplete,
        thirdScreenIsComplete,
        setThirdScreenIsComplete,
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
