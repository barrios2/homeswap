import React, { useState, useEffect } from "react";
import "./SearchBar.css";
import searchIcon from "./assets/icon-search.svg";
import useFetch from "../../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function SearchBar() {
  const [totalHouses, setTotalHouses] = useState(null);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [numberOfBedrooms, setNumberOfBedrooms] = useState([]);
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [selectedNumOfBedrooms, setSelectedNumOfBedrooms] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState("");
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  //backend fetch total houses
  const { performFetch: fetchTotalHouses } = useFetch(
    "/property/get?",
    (data) => {
      setTotalHouses(data.total);
    },
  );
  //backend fetch types
  const { performFetch: fetchPropertyTypes } = useFetch(
    "/property/get?type",
    (data) => {
      setPropertyTypes(data.types);
    },
  );
  //backend fetch number of bedrooms
  const { performFetch: fetchAvailableBedrooms } = useFetch(
    "/property/bedrooms",
    (data) => {
      setNumberOfBedrooms(data.bedrooms);
    },
  );

  const { performFetch: fetchAmenities } = useFetch(
    "/property/amenities",
    (data) => {
      setAmenities(data.amenities);
    },
  );

  useEffect(() => {
    fetchTotalHouses();
    fetchPropertyTypes();
    fetchAvailableBedrooms();
    fetchAmenities();
  }, []);

  //handle fetch for when the DB is available

  const handleSearch = async () => {
    const searchParams = new URLSearchParams();
    // split search input into city and country
    const [city, country] = searchInput.split(" ");
    if (country) {
      searchParams.append("country", country.trim());
    }
    if (city) {
      searchParams.append("city", city.trim());
    }

    if (selectedPropertyType) {
      searchParams.append("type", selectedPropertyType);
    }
    if (selectedNumOfBedrooms) {
      searchParams.append("bedrooms", selectedNumOfBedrooms);
    }
    if (selectedAmenities) {
      searchParams.append("amenities", selectedAmenities);
    }

    try {
      const response = await fetch(`/property/search?${searchParams}`);
      if (response.ok) {
        const searchData = await response.json();
        navigate("/search-results", { state: { searchResults: searchData } });
        setError(null); // resetting to null if search is successful
      } else {
        throw new Error("Failed to search properties");
      }
    } catch (error) {
      setError(
        "There are currently no properties available. Please try again later.",
      );
    }
  };

  return (
    <div>
      <div className="wrapper">
        <h1 className="search-title">Find a home that suits your needs</h1>
        <div className="search-container">
          <div className="criteria">
            <p>location</p>
            <div className="vertical-line"></div>
            <p>property</p>
            <div className="vertical-line"></div>
            <p>bedrooms</p>
            <div className="vertical-line"></div>
            <p>amenities</p>
            <div className="vertical-line"></div>
            <div className="availability">
              {/* ignore this part for now */}
              {totalHouses !== null
                ? `${totalHouses} houses available`
                : "Loading..."}
            </div>
            <div className="search-icon-container">
              {" "}
              <img
                src={searchIcon}
                alt="search-button"
                onClick={handleSearch}
              />
            </div>
          </div>
          <div className="options">
            <input
              type="text"
              className="area"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter city and country..."
            />

            <select
              value={selectedPropertyType}
              onChange={(e) => setSelectedPropertyType(e.target.value)}
              className="type"
            >
              <option value="">Select Property Type</option>
              {propertyTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <select
              value={selectedNumOfBedrooms}
              onChange={(e) => setSelectedNumOfBedrooms(e.target.value)}
              className="num-of-bedrooms"
            >
              <option value="">Number of Bedrooms</option>
              {numberOfBedrooms.map((bedrooms, index) => (
                <option key={index} value={bedrooms}>
                  {bedrooms}
                </option>
              ))}
            </select>
            <select
              value={selectedAmenities}
              onChange={(e) => setSelectedAmenities(e.target.value)}
              className="amenities"
            >
              <option value="">Select Amenities</option>
              {amenities.map((amenity, index) => (
                <option key={index} value={amenity}>
                  {amenity}
                </option>
              ))}
            </select>
          </div>
        </div>
        {error && <div className="error-message">{error}</div>}
      </div>
      <div className="divider"></div>
    </div>
  );
}

export default SearchBar;
