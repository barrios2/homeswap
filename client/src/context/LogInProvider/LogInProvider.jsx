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
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [searchParams, setSearchParams] = useState({
    country: "",
    city: "",
    type: "",
    bedrooms: "",
    amenities: [],
  });
  const parameters = new URLSearchParams(searchParams);
  const params = parameters.toString();
  const [userProperties, setUserProperties] = useState([]);
  const [username, setUsername] = useState(null);
  const [userRequests, setUserRequests] = useState([]);

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
        properties,
        setProperties,
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages,
        searchParams,
        setSearchParams,
        params,
        userProperties,
        setUserProperties,
        username,
        setUsername,
        userRequests,
        setUserRequests,
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
