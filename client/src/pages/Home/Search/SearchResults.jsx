import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { logError } from "../../../../../server/src/util/logging";
import PropertyCard from "../../../components/PropertyCard/PropertyCard";
import "../../../components/PropertyCard/PropertyCard.css";
import "./SearchResults.css";

const SearchResults = () => {
  const location = useLocation();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const searchParams = location.state?.searchParams;
    if (searchParams) {
      axios
        .get("http://localhost:3000/api/property/get", { params: searchParams })
        .then((response) => {
          if (Array.isArray(response.data.data)) {
            setProperties(response.data.data);
          } else {
            setProperties([]);
          }
        })
        .catch((error) => {
          setProperties([]);
          logError("Error fetching amenities:", error);
        });
    }
  }, [location.state?.searchParams]);

  // checking if searchParams exist before rendering the header for search results
  const searchPerformed = location.state?.searchParams;

  return (
    <div className="results-list-section">
      {searchPerformed && (
        <h2 className="header-search-results">
          {properties.length > 0
            ? "We found results that matches your search criteria"
            : ""}
        </h2>
      )}
      <div className="property-card-container">
        {properties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
