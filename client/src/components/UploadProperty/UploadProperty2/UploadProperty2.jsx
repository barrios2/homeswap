import React, { useState } from "react";
import { SlScreenDesktop } from "react-icons/sl";
import { GrWifi } from "react-icons/gr";
import { FaParking } from "react-icons/fa";
import { FaPersonSwimming } from "react-icons/fa6";
import { MdCoffeeMaker } from "react-icons/md";
import { GiWashingMachine } from "react-icons/gi";
import { RiFirstAidKitFill } from "react-icons/ri";
import { GiMountains } from "react-icons/gi";
import { GiBarbecue } from "react-icons/gi";
import { FaUmbrellaBeach } from "react-icons/fa6";
import { FaBasketShopping } from "react-icons/fa6";
import { CgGym } from "react-icons/cg";
import "./UploadProperty2.css";
import UploadPropertyNav from "../UploadPropertyNav/UploadPropertyNav";
import { useLogin } from "../../../context/LogInProvider/LogInProvider";

function UploadProperty2() {
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const { setSecondScreenIsComplete } = useLogin();

  const iconSize = 30;
  const uploadAmenitiesData = [
    { icon: <SlScreenDesktop color="#ae593a" size={iconSize} />, text: "TV" },
    { icon: <GrWifi color="#ae593a" size={iconSize} />, text: "Wi-Fi" },
    {
      icon: <FaParking color="#ae593a" size={iconSize} />,
      text: "Free Parking",
    },
    {
      icon: <FaPersonSwimming color="#ae593a" size={iconSize} />,
      text: "Swimming Pool",
    },
    {
      icon: <MdCoffeeMaker color="#ae593a" size={iconSize} />,
      text: "Coffee Maker",
    },
    {
      icon: <GiWashingMachine color="#ae593a" size={iconSize} />,
      text: "Dish Washer",
    },
    {
      icon: <RiFirstAidKitFill color="#ae593a" size={iconSize} />,
      text: "First Aid Kit",
    },
    {
      icon: <GiMountains color="#ae593a" size={iconSize} />,
      text: "Mountains",
    },
    {
      icon: <GiBarbecue color="#ae593a" size={iconSize} />,
      text: "Barbecue Grill",
    },
    {
      icon: <FaUmbrellaBeach color="#ae593a" size={iconSize} />,
      text: "Near the Sea",
    },
    {
      icon: <FaBasketShopping color="#ae593a" size={iconSize} />,
      text: "Shopping Centers",
    },
    { icon: <CgGym color="#ae593a" size={iconSize} />, text: "Gym" },
  ];

  const toggleAmenity = (index) => {
    const updatedAmenities = [...selectedAmenities];
    if (updatedAmenities.includes(index)) {
      updatedAmenities.splice(updatedAmenities.indexOf(index), 1);
    } else {
      updatedAmenities.push(index);
    }
    setSelectedAmenities(updatedAmenities);
  };

  const handleSubmit = () => {
    if (selectedAmenities.length >= 1) {
      setSecondScreenIsComplete(true);
    } else {
      setSecondScreenIsComplete(false);
    }
  };

  return (
    <>
      <UploadPropertyNav />
      <div className="upload-property2-container">
        <div className="upload-property2-details">
          <header>
            <h1 className="upload-property2-title">
              Please choose your home amenities
            </h1>
            <div className="amenities-input">
              <div className="amenities-input1">
                <div className="upload-card2-container">
                  <ul className="amenities-grid">
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

        <div className="propety-image">
          <img
            src="https://cdn.dribbble.com/users/2110955/screenshots/4948218/media/f8832cd2e44e56f9b6d260286fa61e8a.png?resize=800x600&vertical=center"
            alt=""
            className="propety-pic"
          />
          <div className="upload-footer">
            <button
              type="submit"
              className="input-submit"
              onClick={handleSubmit}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UploadProperty2;
