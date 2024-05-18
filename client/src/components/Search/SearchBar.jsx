import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logError } from "../../../../server/src/util/logging";
import "./SearchBar.css";
import useFetch from "../../hooks/useFetch";
import { useLogin } from "../../context/LogInProvider/LogInProvider";

const Search = () => {
  const {
    setProperties,
    setCurrentPage,
    setTotalPages,
    searchParams,
    setSearchParams,
    params,
  } = useLogin();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loader, setLoader] = useState(false);
  const [amenities, setAmenities] = useState([]);
  const { error, performFetch } = useFetch(
    "/property/amenities",
    onDataReceived,
  );

  const {
    isLoading,
    error: dataError,
    performFetch: performPropertiesFetch,
  } = useFetch(`/property/get?${params}`, onPropertiesReceived);

  function onDataReceived(data) {
    setAmenities(data.data);
  }

  function onPropertiesReceived(data) {
    // overwrites the properties from first render + currentPage and totalPages so that pagination can be shown accordingly
    setProperties(data.data);
    setCurrentPage(data.page);
    setTotalPages(data.totalPages);
    setLoader(false);
  }

  useEffect(() => {
    performFetch();
    if (error) {
      logError("Error fetching amenities:", error);
    }
  }, []);

  const handleInputChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  //search form fields validation
  const validateSearchCriteria = () => {
    if (
      !searchParams.country &&
      !searchParams.city &&
      !searchParams.type &&
      !searchParams.bedrooms &&
      searchParams.amenities.length === 0
    ) {
      return false;
    }
    return true;
  };

  const handleSearch = () => {
    setErrorMessage(null);
    if (!validateSearchCriteria()) {
      setErrorMessage("Please enter at least one search criteria.");
      return;
    }
    setLoader(true);
    setTimeout(() => {
      performPropertiesFetch();
      if (dataError) {
        toast.error(
          "Currently there are no properties that matches your search criteria.",
        );
      }
    }, 1000);
  };

  const style = {
    position: "fixed",
    top: "60%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <div className="search-container-main">
      <div className="search-component-wrapper">
        <h1 className="search-title">Find a home that suits your needs</h1>
        <div className="search-container">
          <div className="criteria">
            <div className="location-container-search">
              <span>location</span>
            </div>
            <div className="vertical-line"></div>
            <div className="property-container-search">
              <span className="span-property">property</span>
            </div>
            <div className="vertical-line"></div>
            <div className="bedrooms-container-search">
              <span className="span-bedrooms">bedrooms</span>
            </div>
            <div className="vertical-line"></div>
            <div className="amenities-container-search">
              <span className="span-amenities">amenities</span>
            </div>
            <div className="search-icon-container">
              <CiSearch
                color="#fff"
                className="search-bar-search-icon"
                onClick={handleSearch}
                disabled={isLoading}
              />
            </div>
            <div className="vertical-line"></div>
          </div>
        </div>
        <div className="options">
          <div className="country-city">
            <input
              type="text"
              name="country"
              placeholder="Enter country..."
              className="area"
              value={searchParams.country}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="city"
              placeholder="Enter city..."
              className="area-2"
              value={searchParams.city}
              onChange={handleInputChange}
            />
          </div>
          <input
            type="text"
            name="type"
            placeholder="Enter home type e.g studio ..."
            className="type"
            value={searchParams.type}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="bedrooms"
            placeholder="Enter number of bedrooms..."
            className="num-of-bedrooms"
            value={searchParams.bedrooms}
            onChange={handleInputChange}
          />
          <select
            name="amenities"
            onChange={handleInputChange}
            className="amenities"
          >
            <option value="">Select Amenity</option>
            {amenities.map((amenities) => (
              <option key={amenities} value={amenities}>
                {amenities}
              </option>
            ))}
          </select>
        </div>
        {errorMessage && (
          <div className="validation-error-search">
            <span>{errorMessage}</span>
          </div>
        )}
        <div className="loader-container" style={style}>
          {loader && (
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="#000"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
