import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faHouse,
  faPersonShelter,
} from "@fortawesome/free-solid-svg-icons";
import "./UploadProperty1.css";

const UploadProperty1 = ({
  goToNextPage,
  formdata,
  setformdata,
  validateForm,
  errors,
}) => {
  const handleHomeTypeSelect = (type) => {
    setformdata((prevState) => ({
      ...prevState,
      type: type,
    }));
  };

  const handleNextButtonClick = () => {
    if (validateForm()) {
      goToNextPage();
    }
  };

  return (
    <div className="first-screen-container">
      <div className="form-left-container">
        <div className="margin-bottom">
          <h3 className="title-header">Please provide a title for your home</h3>
          {errors.title && (
            <span className="error-property1">{errors.title}</span>
          )}
          <input
            type="text"
            name="title"
            value={formdata.title}
            onChange={(event) =>
              setformdata({ ...formdata, title: event.target.value })
            }
            required
            className="input-text"
          />
        </div>
        <div className="margin-bottom">
          <h3 className="margin-bottom">Select your home type</h3>
          {errors.homeType && (
            <span className="error-property1">{errors.Type}</span>
          )}
          <div className="white-border fields-container home-type-icons">
            <button
              className={`icon-btn ${formdata.type === "house" ? "activeHome" : ""}`}
              onClick={() => handleHomeTypeSelect("house")}
            >
              {" "}
              <FontAwesomeIcon
                icon={faHouse}
                className="icon-size-change margin-bottom"
              />{" "}
              House
            </button>
            <button
              className={`icon-btn ${formdata.type === "apartment" ? "activeHome" : ""}`}
              onClick={() => handleHomeTypeSelect("apartment")}
            >
              {" "}
              <FontAwesomeIcon
                icon={faBuilding}
                className="icon-size-change margin-bottom"
              />{" "}
              Apartment
            </button>
            <button
              className={`icon-btn ${formdata.type === "studio" ? "activeHome" : ""}`}
              onClick={() => handleHomeTypeSelect("studio")}
            >
              {" "}
              <FontAwesomeIcon
                icon={faPersonShelter}
                className="icon-size-change margin-bottom"
              />{" "}
              Studio
            </button>
          </div>
        </div>
        <div>
          <h3 className="margin-bottom">What is your home address?</h3>
          {errors.country && (
            <span className="error-property1">{errors.country}</span>
          )}
          {errors.city && (
            <span className="error-property1">{errors.city}</span>
          )}
          {errors.house_number && (
            <span className="error-property1">{errors.house_number}</span>
          )}
          {errors.postcode && (
            <span className="error-property1">{errors.postcode}</span>
          )}
          {errors.street && (
            <span className="error-property1">{errors.street}</span>
          )}
          <form className="form-element white-border">
            <div className="fields-container">
              <label>
                Country
                <input
                  type="text"
                  name="country"
                  value={formdata.address.country}
                  onChange={(event) =>
                    setformdata({
                      ...formdata,
                      address: {
                        ...formdata.address,
                        country: event.target.value,
                      },
                    })
                  }
                  required
                  className="input-text"
                />
              </label>
              <br />
              <label>
                City
                <input
                  type="text"
                  name="city"
                  value={formdata.address.city}
                  onChange={(event) =>
                    setformdata({
                      ...formdata,
                      address: {
                        ...formdata.address,
                        city: event.target.value,
                      },
                    })
                  }
                  required
                  className="input-text"
                />
              </label>
              <br />
              <label>
                Street
                <input
                  type="text"
                  name="street"
                  value={formdata.address.street}
                  onChange={(event) =>
                    setformdata({
                      ...formdata,
                      address: {
                        ...formdata.address,
                        street: event.target.value,
                      },
                    })
                  }
                  required
                  className="input-text"
                />
              </label>
              <br />
              <label>
                House Number
                <input
                  type="text"
                  name="houseNumber"
                  value={formdata.address.house_number}
                  onChange={(event) =>
                    setformdata({
                      ...formdata,
                      address: {
                        ...formdata.address,
                        house_number: event.target.value,
                      },
                    })
                  }
                  required
                  className="input-text"
                />
              </label>
              <br />
              <label>
                Postcode
                <input
                  type="text"
                  name="postcode"
                  value={formdata.address.postcode}
                  onChange={(event) =>
                    setformdata({
                      ...formdata,
                      address: {
                        ...formdata.address,
                        postcode: event.target.value,
                      },
                    })
                  }
                  required
                  className="input-text"
                />
              </label>
            </div>
          </form>
        </div>
      </div>
      <div className="right-screen-container">
        <div className="img-container">
          <img
            src="https://img.freepik.com/vrije-vector/ontspannen-freelancer-man-zittend-op-bed-met-laptop-vooraanzicht-platte-vectorillustratie_1150-40336.jpg?size=626&ext=jpg&ga=GA1.2.1450317072.1715328804&semt=ais"
            alt=""
            className="right-screen-img"
          />
        </div>

        <button
          type="button"
          className="input-submit"
          onClick={handleNextButtonClick}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

UploadProperty1.propTypes = {
  goToNextPage: PropTypes.func.isRequired,
  formdata: PropTypes.object.isRequired,
  setformdata: PropTypes.func.isRequired,
  validateForm: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default UploadProperty1;
