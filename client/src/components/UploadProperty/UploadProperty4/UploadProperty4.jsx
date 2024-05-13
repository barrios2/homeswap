import React, { useState } from "react";
import { TbWheelchairOff } from "react-icons/tb";
import { TbSmokingNo } from "react-icons/tb";
import { MdDoNotDisturbOnTotalSilence } from "react-icons/md";
import { CiMoneyBill } from "react-icons/ci";
import { FaToggleOff } from "react-icons/fa";
import { GiBrokenPottery } from "react-icons/gi";
import { GiSonicShoes } from "react-icons/gi";
import { MdOutlinePets } from "react-icons/md";
import { MdOutlineCleaningServices } from "react-icons/md";
import "./UploadProperty4.css";

function UploadProperty4() {
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const iconSize = 30;
  const uploadAmenitiesData = [
    {
      icon: <TbSmokingNo color="#ae593a" size={iconSize} />,
      text: "No smoking",
    },
    {
      icon: <MdOutlinePets color="#ae593a" size={iconSize} />,
      text: "No pets",
    },
    {
      icon: <MdDoNotDisturbOnTotalSilence color="#ae593a" size={iconSize} />,
      text: "No noise after 22:00",
    },
    {
      icon: <MdDoNotDisturbOnTotalSilence color="#ae593a" size={iconSize} />,
      text: "No kids",
    },
    {
      icon: <GiSonicShoes color="#ae593a" size={iconSize} />,
      text: "No shoes allowed inside the property",
    },
    {
      icon: <GiBrokenPottery color="#ae593a" size={iconSize} />,
      text: "Penalty applied for any damage",
    },
    {
      icon: <FaToggleOff color="#ae593a" size={iconSize} />,
      text: "Turn off lights and AC after use",
    },
    {
      icon: <CiMoneyBill color="#ae593a" size={iconSize} />,
      text: "Cleaning fee",
    },
    {
      icon: <MdOutlineCleaningServices color="#ae593a" size={iconSize} />,
      text: "Clean before leaving",
    },
    {
      icon: <TbWheelchairOff color="#ae593a" size={iconSize} />,
      text: "Wheelchair not accessible",
    },
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

  return (
    <>
      <div className="upload-property4-container">
        <div className="upload-propety4-details">
          <header>
            <h1 className="upload-title">
              Describe your home, what makes it special?
            </h1>
            <div className="textarae-input">
              <div className="text-input">
                <textarea
                  className="textarea-property4"
                  name=""
                  id="text-area"
                  cols="30"
                  rows="10"
                >
                  Add home description...
                </textarea>
              </div>
            </div>
            <br />
            <h1 className="upload-title">
              Please add some photos of your home
            </h1>
            <div className="rules-input">
              <div className="amenities-input1">
                <div className="upload-card2-container">
                  <ul className="amenities-grid">
                    {uploadAmenitiesData.map((amenity, index) => (
                      // <li key={index} className="amenity-item">
                      //     <div className="amenity-icon">{amenity.icon}</div>
                      //     <span className="amenity-text">{amenity.text}</span>
                      // </li>
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
            src="https://img.freepik.com/vrije-vector/ontspannen-freelancer-man-zittend-op-bed-met-laptop-vooraanzicht-platte-vectorillustratie_1150-40336.jpg?size=626&ext=jpg&ga=GA1.2.1450317072.1715328804&semt=ais"
            alt=""
            className="propety-pic"
          />
          <div className="upload-footer">
            <button type="button">
              <span>Continue</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UploadProperty4;
