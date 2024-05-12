import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

import "./ViewProperty.css";

const initialObject = {
  address: {
    country: "",
    city: "",
    street: "",
    house_number: "",
    postcode: "",
  },
  title: "",
  description: "",
  type: "",
  bedrooms: 0,
  bathrooms: 0,
  amenities: [],
  house_rules: [],
  photos: [],
};

function ViewProperty() {
  let [viewPropertyDetails, setViewPropertyDetails] = useState(initialObject);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const { id } = useParams();
  const { isLoading, error, performFetch } = useFetch(
    `/property/view/${id}`,
    (data) => {
      setViewPropertyDetails(data.data);
    },
  );

  useEffect(() => {
    performFetch();
  }, []);

  const goToPreviousPhoto = () => {
    setCurrentPhotoIndex(
      currentPhotoIndex === 0
        ? viewPropertyDetails.photos.length - 1
        : currentPhotoIndex - 1,
    );
  };

  const goToNextPhoto = () => {
    setCurrentPhotoIndex(
      currentPhotoIndex === viewPropertyDetails.photos.length - 1
        ? 0
        : currentPhotoIndex + 1,
    );
  };

  const handleApplyClick = () => {
    setShowPopup(true); // Show the pop-up when "Apply" button is clicked
  };

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  if (!viewPropertyDetails) {
    return null;
  }

  return (
    <>
      <nav className="nav-item-viewproperty">
        <Link to={"/home"} className="link-to-home">
          Back Home
        </Link>
        <ul>
          <li>My Request</li>
          <li>Profile</li>
        </ul>
      </nav>
      <div className="container-viewproperty">
        <div className="propety-image">
          <img
            src={viewPropertyDetails.photos[currentPhotoIndex]}
            alt={`House ${currentPhotoIndex + 1}`}
            className="propety-pic"
          />
          <button onClick={goToPreviousPhoto} className="arrow-button1">
            &#8249;
          </button>
          <button onClick={goToNextPhoto} className="arrow-button2">
            &#8250;
          </button>
          <div className="dots">
            {viewPropertyDetails.photos.map((photo, index) => (
              <a
                href="#!"
                key={index}
                className={index === currentPhotoIndex ? "active" : ""}
              >
                <i>{index + 1}</i>
              </a>
            ))}
          </div>
        </div>

        <div className="propety-details">
          <header>
            <h1 className="title">{viewPropertyDetails.title}</h1>
            <span className="amenitiesCat">{viewPropertyDetails.type}</span>
            <div className="address">
              <span className="before">
                {viewPropertyDetails.address.country}
              </span>
              <span className="current">
                {viewPropertyDetails.address.city}
              </span>
              <span className="current">
                {viewPropertyDetails.address.postcode}
              </span>
            </div>

            {/* <div className="rate">
              {[...Array(5)].map((_, index) => (
                <a href="#!" key={index} className={index < viewPropertyDetails.reviews[0].rating ? "active" : ""}>★</a>
              ))}
            </div> */}
          </header>

          <article>
            <h5>Description</h5>
            <p>{viewPropertyDetails.description}</p>
          </article>
          <div className="controls">
            <div></div>
            <div className="amenities">
              <h5>Amenities</h5>
              <ul className="amenities-dropdown">
                {viewPropertyDetails.amenities.map((amenity, index) => (
                  <li key={index}>{amenity}</li>
                ))}
              </ul>
            </div>
            <div className="bedrooms">
              <h5>Bedrooms</h5>
              <a href="#!" className="option">
                {viewPropertyDetails.bedrooms}
              </a>
            </div>
            <div className="bathrooms">
              <h5>Bathrooms</h5>
              <a href="#!" className="option">
                {viewPropertyDetails.bathrooms}
              </a>
            </div>
            <div className="rules">
              <h5>Rules</h5>
              <ul className="rules-dropdown">
                {viewPropertyDetails.house_rules.map((amenity, index) => (
                  <li key={index}>{amenity}</li>
                ))}
              </ul>
            </div>
            s
          </div>
          <div className="footer-view-property">
            <button type="button" onClick={handleApplyClick}>
              <span>Apply</span>
            </button>
          </div>
          {showPopup && (
            <div className="popup">
              <div className="popup-content">
                <span className="close" onClick={() => setShowPopup(false)}>
                  &times;
                </span>
                <p>
                  Thank you for your interest! Your application has been
                  submitted successfully.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ViewProperty;
