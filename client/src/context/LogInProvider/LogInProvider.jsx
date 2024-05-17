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

  return (
    <LogInContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
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
