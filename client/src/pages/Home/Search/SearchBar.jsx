import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logError } from "../../../../../server/src/util/logging";
import "./SearchBar.css";

const Search = () => {
  const navigate = useNavigate();
  const [amenities, setAmenities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    country: "",
    city: "",
    type: "",
    bedrooms: "",
    amenities: [],
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/property/amenities")
      .then((response) => {
        setAmenities(response.data);
      })
      .catch((error) => {
        logError("Error fetching amenities:", error);
        toast.error("Failed to fetch amenities.");
      });
  }, []);

  const handleInputChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    setIsLoading(true);
    // Send searchParams to backend
    setTimeout(() => {
      axios
        .get("http://localhost:3000/api/property/get", { params: searchParams })
        .then(() => {
          // Navigating to the search-results page with search params
          navigate("/search-results", { state: { searchParams } });
          setIsLoading(false);
        })
        .catch((error) => {
          logError("Error searching properties:", error);
          setIsLoading(false);
          toast.error(
            "Currently there are no properties that matches your search criteria.",
          );
        });
    }, 2000);
  };

  const style = {
    position: "fixed",
    top: "54%",
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
              <span>property</span>
            </div>
            <div className="vertical-line"></div>
            <div className="bedrooms-container-search">
              <span>bedrooms</span>
            </div>
            <div className="vertical-line"></div>
            <div className="amenities-container-search">
              <span>amenities</span>
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
        <div className="loader-container" style={style}>
          {isLoading && (
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

        <div className="search-bar-divider"></div>
      </div>
    </div>
  );
};

export default Search;
