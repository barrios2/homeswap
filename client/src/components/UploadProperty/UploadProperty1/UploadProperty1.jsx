import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faHouse,
  faPersonShelter,
} from "@fortawesome/free-solid-svg-icons";
import screen1 from "../../../assets/upload-property-screen1.png";
import "./UploadProperty1.css";
import { useLogin } from "../../../context/LogInProvider/LogInProvider";

const UploadProperty1 = () => {
  const {
    formData,
    setFormData,
    formErrors,
    setFormErrors,
    setFirstScreenIsComplete,
  } = useLogin();
  const [selectedHomeType, setSelectedHomeType] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Clear the error message when the user starts typing
    setFormErrors((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  const handleHomeTypeSelect = (homeType) => {
    setSelectedHomeType(homeType);
    setFormData((prevState) => ({
      ...prevState,
      homeType: homeType,
    }));

    // Clear the error message when the user selects a home type
    setFormErrors((prevState) => ({
      ...prevState,
      homeType: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Call the validateForm function to validate the form
    const isValid = validateForm();
    if (isValid) {
      setFirstScreenIsComplete(true);
    } else {
      setFirstScreenIsComplete(false);
    }
  };

  const validateForm = () => {
    let isValid = true; // Assuming there are no errors, isValid starts at true
    const errors = { ...formErrors }; // Copy over previous errors if any

    // Predefined errors
    const fieldErrors = {
      title: "Title is required",
      country: "Country is required",
      city: "City is required",
      street: "Street is required",
      houseNumber: "House Number is required",
      postcode: "Postcode is required",
      homeType: "Home type is required",
    };

    // To check each field if there is data present
    for (const [fieldName, errorMessage] of Object.entries(fieldErrors)) {
      if (!formData[fieldName]) {
        errors[fieldName] = errorMessage; // Set corresponding error in its field name
        isValid = false; // Invalidate form
      }
    }

    setFormErrors(errors);
    return isValid;
  };

  return (
    <div className="first-screen-container">
      <div className="form-left-container">
        <div className="margin-bottom">
          <h3 className="title-header">Please provide a title for your home</h3>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="input-text"
          />
          {formErrors.title && (
            <div className="error-red">
              <span>{formErrors.title}</span>
            </div>
          )}
        </div>
        <div className="margin-bottom">
          <h3 className="margin-bottom">Select your home type</h3>
          <div className="white-border fields-container home-type-icons">
            <button
              className="icon-btn"
              onClick={() => handleHomeTypeSelect("house")}
            >
              {" "}
              <FontAwesomeIcon
                icon={faHouse}
                className={`icon-size-change margin-bottom ${selectedHomeType === "house" ? "activeHome" : ""}`}
              />{" "}
              House
            </button>
            <button
              className="icon-btn"
              onClick={() => handleHomeTypeSelect("apartment")}
            >
              {" "}
              <FontAwesomeIcon
                icon={faBuilding}
                className={`icon-size-change margin-bottom ${selectedHomeType === "apartment" ? "activeHome" : ""}`}
              />{" "}
              Apartment
            </button>
            <button
              className="icon-btn"
              onClick={() => handleHomeTypeSelect("studio")}
            >
              {" "}
              <FontAwesomeIcon
                icon={faPersonShelter}
                className={`icon-size-change margin-bottom ${selectedHomeType === "studio" ? "activeHome" : ""}`}
              />{" "}
              Studio
            </button>
          </div>
          {formErrors.homeType && (
            <div className="error-red">
              <span>{formErrors.homeType}</span>
            </div>
          )}
        </div>
        <div>
          <h3 className="margin-bottom">What is your home address?</h3>
          <form className="form-element white-border">
            <div className="fields-container">
              <label>
                Country
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="input-text"
                />
                {formErrors.country && (
                  <div className="error-red">
                    <span>{formErrors.country}</span>
                  </div>
                )}
              </label>
              <br />
              <label>
                City
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="input-text"
                />
                {formErrors.city && (
                  <div className="error-red">
                    <span>{formErrors.city}</span>
                  </div>
                )}
              </label>
              <br />
              <label>
                Street
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  required
                  className="input-text"
                />
                {formErrors.street && (
                  <div className="error-red">
                    <span>{formErrors.street}</span>
                  </div>
                )}
              </label>
              <br />
              <label>
                House Number
                <input
                  type="text"
                  name="houseNumber"
                  value={formData.houseNumber}
                  onChange={handleChange}
                  required
                  className="input-text"
                />
                {formErrors.houseNumber && (
                  <div className="error-red">
                    <span>{formErrors.houseNumber}</span>
                  </div>
                )}
              </label>
              <br />
              <label>
                Postcode
                <input
                  type="text"
                  name="postcode"
                  value={formData.postcode}
                  onChange={handleChange}
                  required
                  className="input-text"
                />
                {formErrors.postcode && (
                  <div className="error-red">
                    <span>{formErrors.postcode}</span>
                  </div>
                )}
              </label>
            </div>
          </form>
        </div>
      </div>
      <div className="right-screen-container">
        <div className="img-container">
          <img src={screen1} alt="" className="right-screen-img" />
        </div>
        {/* If validateForm function returns false, the button will be enabled */}
        <button
          type="submit"
          className="input-submit"
          disabled={Object.values(formErrors).some((error) => error)}
          onClick={handleSubmit}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default UploadProperty1;
