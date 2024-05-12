import React from "react";
import "./UploadProperty2.css";
import navigateBackIcon from "./assets-uploaad/icon-navigateBack.svg";
// import iconArrowDown from "./assets-uploaad/icon-arrowdown.svg";
import iconArrowDown from "./assets-uploaad/icon-arrowdown.svg";
import houseImg1 from "./assets-uploaad/Screenshot33.png";
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

function UploadProperty() {
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

  return (
    <div className="upload-card2-main-container">
      <img src={navigateBackIcon} alt="" className="navigate-back" />
      <p className="choose-your-home-title">Choose your home amenities</p>
      <div className="house-and-amenities-container">
        <div className="upload-card2-container">
          <ul className="amenities-grid">
            {uploadAmenitiesData.map((amenity, index) => (
              <li key={index} className="amenity-item">
                <div className="amenity-icon">{amenity.icon}</div>
                <span className="amenity-text">{amenity.text}</span>
              </li>
            ))}
          </ul>

          <img
            src={iconArrowDown}
            alt="arrow down icon"
            className="arrow-down2"
          />
        </div>
        <div className="house-and-button-container">
          <div className="next-house-img">
            <img src={houseImg1} alt="image of a house" className="houseImg1" />
          </div>
        </div>
        <button className="upload-property2-continue-btn">Continue</button>
      </div>
    </div>
  );
}

export default UploadProperty;
