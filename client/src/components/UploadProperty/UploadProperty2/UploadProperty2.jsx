import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { SlScreenDesktop } from "react-icons/sl";
import { GrWifi } from "react-icons/gr";
import {
  FaParking,
  FaSmoking,
  FaWheelchair,
  FaSnowflake,
  FaDog,
  FaChild,
  FaBus,
  FaBasketballBall,
} from "react-icons/fa";
import {
  FaPersonSwimming,
  FaUmbrellaBeach,
  FaBasketShopping,
} from "react-icons/fa6";
import {
  MdCoffeeMaker,
  MdWork,
  MdFireExtinguisher,
  MdOutdoorGrill,
  MdRestaurant,
} from "react-icons/md";
import { GiWashingMachine, GiBarbecue, GiTreehouse } from "react-icons/gi"; // Replaced GiTourist with GiTreehouse
import { RiFirstAidKitFill } from "react-icons/ri";
import { CgGym } from "react-icons/cg";
import "./UploadProperty2.css";

function UploadProperty2({
  goToNextPage,
  formdata,
  setformdata,
  validateForm,
  errors,
}) {
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const iconSize = 30;
  const uploadAmenitiesData = [
    { icon: <GrWifi color="#ae593a" size={iconSize} />, text: "Wifi" },
    {
      icon: <FaParking color="#ae593a" size={iconSize} />,
      text: "Free parking",
    },
    { icon: <SlScreenDesktop color="#ae593a" size={iconSize} />, text: "TV" },
    {
      icon: <FaPersonSwimming color="#ae593a" size={iconSize} />,
      text: "Swimming pool",
    },
    {
      icon: <FaSmoking color="#ae593a" size={iconSize} />,
      text: "Smoking allowed",
    },
    {
      icon: <FaWheelchair color="#ae593a" size={iconSize} />,
      text: "Wheelchair accessibility",
    },
    { icon: <CgGym color="#ae593a" size={iconSize} />, text: "Gym" },
    {
      icon: <FaSnowflake color="#ae593a" size={iconSize} />,
      text: "Air conditioning",
    },
    { icon: <FaDog color="#ae593a" size={iconSize} />, text: "Pets allowed" },
    {
      icon: <FaChild color="#ae593a" size={iconSize} />,
      text: "Family/kids friendly",
    },
    {
      icon: <MdWork color="#ae593a" size={iconSize} />,
      text: "Friendly workspace",
    },
    {
      icon: <MdCoffeeMaker color="#ae593a" size={iconSize} />,
      text: "Coffee maker",
    },
    {
      icon: <GiWashingMachine color="#ae593a" size={iconSize} />,
      text: "Dishwasher",
    },
    {
      icon: <RiFirstAidKitFill color="#ae593a" size={iconSize} />,
      text: "First aid kit",
    },
    {
      icon: <MdFireExtinguisher color="#ae593a" size={iconSize} />,
      text: "Fire extinguisher(s)",
    },
    {
      icon: <MdOutdoorGrill color="#ae593a" size={iconSize} />,
      text: "Outdoor furniture",
    },
    {
      icon: <GiBarbecue color="#ae593a" size={iconSize} />,
      text: "Barbecue grill",
    },
    {
      icon: <FaUmbrellaBeach color="#ae593a" size={iconSize} />,
      text: "Near the sea",
    },
    {
      icon: <FaBus color="#ae593a" size={iconSize} />,
      text: "Near public transportation",
    },
    {
      icon: <FaBasketShopping color="#ae593a" size={iconSize} />,
      text: "Near shopping centers",
    },
    {
      icon: <MdRestaurant color="#ae593a" size={iconSize} />,
      text: "Near restaurants",
    },
    {
      icon: <GiTreehouse color="#ae593a" size={iconSize} />,
      text: "Near tourist attractions",
    }, // Changed icon
    {
      icon: <FaBasketballBall color="#ae593a" size={iconSize} />,
      text: "Near sports facilities",
    },
  ];
  useEffect(() => {
    setSelectedAmenities(
      formdata.amenities.map((amenity) => {
        return uploadAmenitiesData.findIndex((data) => data.text === amenity);
      }),
    );
  }, [formdata.amenities]);

  const toggleAmenity = (index) => {
    const updatedAmenities = [...selectedAmenities];
    if (updatedAmenities.includes(index)) {
      updatedAmenities.splice(updatedAmenities.indexOf(index), 1);
    } else {
      updatedAmenities.push(index);
    }
    setSelectedAmenities(updatedAmenities);

    const selectedAmenitiesText = updatedAmenities.map(
      (index) => uploadAmenitiesData[index].text,
    );
    setformdata((prevData) => ({
      ...prevData,
      amenities: selectedAmenitiesText,
    }));
  };

  const handleNextButtonClick = () => {
    if (validateForm()) {
      goToNextPage();
    }
  };

  return (
    <>
      <div className="upload-property2-container">
        <div className="upload-property2-details">
          <header>
            <h1 className="upload-property2-title">
              Please choose your home amenities
            </h1>
            <div className="error-amenities">
              {errors.amenities && (
                <span className="error">{errors.amenities}</span>
              )}
            </div>

            <div className="amenities-input">
              <div className="amenities-input1">
                <div className="upload-card2-container">
                  <ul className="amenities-grid-property2">
                    {uploadAmenitiesData.map((amenity, index) => (
                      <li
                        key={index}
                        className={`amenity-item ${selectedAmenities.includes(index) ? "selected" : ""}`}
                        onClick={() => toggleAmenity(index)}
                      >
                        <input
                          type="checkbox"
                          checked={selectedAmenities.includes(index)}
                          onChange={() => toggleAmenity(index)}
                          value={formdata.amenities}
                        />
                        <div className="amenity-icon">{amenity.icon}</div>
                        <span className="amenity-text">{amenity.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </header>
        </div>

        <div className="propety-image-property2">
          <img
            src="https://cdn.dribbble.com/users/2110955/screenshots/4948218/media/f8832cd2e44e56f9b6d260286fa61e8a.png?resize=800x600&vertical=center"
            alt=""
            className="propety-pic-property2"
          />
          <div className="upload-property3-footer">
            <button type="button" onClick={handleNextButtonClick}>
              <span>Continue</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

UploadProperty2.propTypes = {
  goToNextPage: PropTypes.func.isRequired,
  formdata: PropTypes.object.isRequired,
  setformdata: PropTypes.func.isRequired,
  validateForm: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default UploadProperty2;
