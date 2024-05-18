import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
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
// import { text } from "@fortawesome/fontawesome-svg-core";

function UploadProperty4({
  submitFormData,
  formdata,
  setformdata,
  validateForm,
  errors,
}) {
  const [description, setDescription] = useState(formdata.description || "");
  const [house_rules, setRules] = useState(formdata.house_rules || []);

  useEffect(() => {
    setformdata((prevFormData) => ({
      ...prevFormData,
      description,
      house_rules,
    }));
  }, [description, house_rules, setformdata]);

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
      icon: <MdOutlineCleaningServices color="#ae593a" size={iconSize} />,
      text: "Clean before leaving",
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
      icon: <TbWheelchairOff color="#ae593a" size={iconSize} />,
      text: "Wheelchair not accessible",
    },
    {
      icon: <CiMoneyBill color="#ae593a" size={iconSize} />,
      text: "Cleaning fee",
    },
    {
      icon: <GiSonicShoes color="#ae593a" size={iconSize} />,
      text: "No shoes allowed inside the property",
    },
  ];

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleRuleToggle = (text) => {
    const updatedRules = [...house_rules];
    const ruleIndex = updatedRules.indexOf(text);
    if (ruleIndex !== -1) {
      updatedRules.splice(ruleIndex, 1);
    } else {
      updatedRules.push(text);
    }
    setRules(updatedRules);
  };

  const handleSubmitButtonClick = () => {
    if (validateForm()) {
      submitFormData();
    }
  };

  return (
    <>
      <div className="upload-property4-container">
        <div className="upload-propety4-details">
          <div className="header-property4">
            <h1 className="upload-title">
              Describe your home, what makes it special?
            </h1>
            <div className="rules-error-deccription">
              {errors.description && (
                <span className="error">{errors.description}</span>
              )}
            </div>

            <div className="textarae-input">
              <div className="text-input">
                <textarea
                  className="textarea-property4"
                  name="description"
                  value={description}
                  onChange={handleDescriptionChange}
                  id="text-area"
                  cols="30"
                  rows="10"
                >
                  Add home description...
                </textarea>
              </div>
            </div>
            <br />
            <div>
              <h1 className="upload-title">
                Please specify some rules for your home
              </h1>
            </div>
            <br />
            <div className="rules-error">
              {errors.rules && <span className="error">{errors.rules}</span>}
            </div>
            <div className="rules-input">
              <div className="amenities-input1">
                <div className="upload-card2-container">
                  <ul className="amenities-grid">
                    {uploadAmenitiesData.map((amenity, index) => (
                      <li
                        key={index}
                        className={`amenity-item ${
                          house_rules.includes(amenity.text) ? "selected" : ""
                        }`}
                        onClick={() => handleRuleToggle(amenity.text)}
                      >
                        <div className="amenity-icon">{amenity.icon}</div>
                        <span className="amenity-text">{amenity.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="propety-image-property4">
          <img
            src="https://img.freepik.com/vrije-vector/ontspannen-freelancer-man-zittend-op-bed-met-laptop-vooraanzicht-platte-vectorillustratie_1150-40336.jpg?size=626&ext=jpg&ga=GA1.2.1450317072.1715328804&semt=ais"
            alt=""
            className="propety-pic-property4"
          />
          <div className="upload-footer">
            <button type="submit" onClick={handleSubmitButtonClick}>
              <span>Submit</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

UploadProperty4.propTypes = {
  submitFormData: PropTypes.func.isRequired,
  formdata: PropTypes.object.isRequired,
  setformdata: PropTypes.func.isRequired,
  validateForm: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default UploadProperty4;

// import React, { useState, useEffect, useCallback } from "react";
// import PropTypes from "prop-types";
// import useFetch from "../../../hooks/useFetch"; // Adjust the path as needed
// import {
//   TbWheelchairOff,
//   TbSmokingNo,
// } from "react-icons/tb";
// import {
//   MdDoNotDisturbOnTotalSilence,
//   MdOutlinePets,
//   MdOutlineCleaningServices,
// } from "react-icons/md";
// import { CiMoneyBill } from "react-icons/ci";
// import { FaToggleOff } from "react-icons/fa";
// import { GiBrokenPottery, GiSonicShoes } from "react-icons/gi";

// import "./UploadProperty4.css";

// const iconSize = 30;

// // Amenity icon mapping
// const amenityIcons = {
//   "No smoking": <TbSmokingNo color="#ae593a" size={iconSize} />,
//   "No shoes allowed inside the property": <GiSonicShoes color="#ae593a" size={iconSize} />,
//   "No noise after 22:00": <MdDoNotDisturbOnTotalSilence color="#ae593a" size={iconSize} />,
//   "No kids": <MdDoNotDisturbOnTotalSilence color="#ae593a" size={iconSize} />,
//   "Penalty applied for any damage": <GiBrokenPottery color="#ae593a" size={iconSize} />,
//   "No pets": <MdOutlinePets color="#ae593a" size={iconSize} />,
//   "Turn off lights and AC after use": <FaToggleOff color="#ae593a" size={iconSize} />,
//   "Cleaning fee": <CiMoneyBill color="#ae593a" size={iconSize} />,
//   "Clean before leaving": <MdOutlineCleaningServices color="#ae593a" size={iconSize} />,
//   "Wheelchair not accessible": <TbWheelchairOff color="#ae593a" size={iconSize} />,
// };

// function UploadProperty4({
//   submitFormData,
//   formdata,
//   setformdata,
//   validateForm,
//   errors,
// }) {
//   const [description, setDescription] = useState(formdata.description || "");
//   const [selectedRules, setSelectedRules] = useState([]);

//   const onReceived = useCallback((data) => {
//     const { amenities } = data;
//     setAvailableAmenities(amenities);
//   }, []);

//   const { isLoading, error, performFetch, cancelFetch } = useFetch("/property/amenities", onReceived);

//   useEffect(() => {
//     performFetch();
//     return () => {
//       cancelFetch();
//     };
//   }, [performFetch, cancelFetch]);

//   const [availableAmenities, setAvailableAmenities] = useState([]);

//   useEffect(() => {
//     if (availableAmenities.length > 0) {
//       setSelectedRules(
//         formdata.house_rules.map((rule) => {
//           return availableAmenities.findIndex((data) => data === rule);
//         })
//       );
//     }
//   }, [formdata.house_rules, availableAmenities]);

//   useEffect(() => {
//     setformdata((prevData) => ({
//       ...prevData,
//       description,
//       house_rules: selectedRules.map((index) => availableAmenities[index]),
//     }));
//   }, [description, selectedRules, setformdata, availableAmenities]);

//   const toggleRule = (index) => {
//     const updatedRules = selectedRules.includes(index)
//       ? selectedRules.filter((i) => i !== index)
//       : [...selectedRules, index];
//     setSelectedRules(updatedRules);
//   };

//   const handleSubmitButtonClick = () => {
//     if (validateForm()) {
//       submitFormData();
//     }
//   };

//   if (isLoading) {
//     return <div>Loading amenities...</div>;
//   }

//   if (error) {
//     return <div>Error loading amenities: {error}</div>;
//   }

//   return (
//     <div className="upload-property4-container">
//       <div className="upload-property4-details">
//         <header>
//           <h1 className="upload-title">Describe your home, what makes it special?</h1>
//           {errors.description && <span className="error">{errors.description}</span>}
//           <textarea
//             className="textarea-property4"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Add home description..."
//             rows="10"
//           />
//         </header>
//         <h1 className="upload-title">Please specify some rules for your home</h1>
//         {errors.rules && <span className="error">{errors.rules}</span>}
//         <div className="upload-card2-container">
//           <ul className="amenities-grid">
//             {availableAmenities.map((amenity, index) => (
//               <li
//                 key={index}
//                 className={`amenity-item ${selectedRules.includes(index) ? "selected" : ""}`}
//                 onClick={() => toggleRule(index)}
//               >
//                 <div className="amenity-icon">
//                   {amenityIcons[amenity] || <span>{index + 1}</span>}
//                 </div>
//                 <span className="amenity-text">{amenity}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//       <div className="property-image-property4">
//         <img
//           src="https://img.freepik.com/vrije-vector/ontspannen-freelancer-man-zittend-op-bed-met-laptop-vooraanzicht-platte-vectorillustratie_1150-40336.jpg?size=626&ext=jpg&ga=GA1.2.1450317072.1715328804&semt=ais"
//           alt="Property"
//           className="property-pic-property4"
//         />
//         <div className="upload-footer">
//           <button type="submit" onClick={handleSubmitButtonClick}>
//             <span>Submit</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// UploadProperty4.propTypes = {
//   submitFormData: PropTypes.func.isRequired,
//   formdata: PropTypes.object.isRequired,
//   setformdata: PropTypes.func.isRequired,
//   validateForm: PropTypes.func.isRequired,
//   errors: PropTypes.object.isRequired,
// };

// export default UploadProperty4;
