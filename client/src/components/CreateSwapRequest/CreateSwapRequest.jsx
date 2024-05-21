import React from "react";
import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useLogin } from "../../context/LogInProvider/LogInProvider";
import PropTypes from "prop-types";
import "./CreateSwapRequest.css";

function CreateSwapRequest({ receiver_propertyID }) {
  const { userId, token } = useLogin();
  const [senderProperties, setSenderProperties] = useState([]);
  const [formData, setFormData] = useState({
    senderPropertyID: "",
    startDate: "",
    endDate: "",
    message: "",
  });

  const [successMsg, setSuccessMsg] = useState("");

  //fetch sender/userProperties
  const {
    isLoading,
    error: userPropertiesError,
    performFetch: performSenderPropertiesFetch,
  } = useFetch(`/user/properties/${userId}`, onSenderProperties);

  //fetch to create a swap request
  const { error, performFetch: performSwapFetch } = useFetch(
    "/swap/create",
    onSwapSuccess,
  );

  useEffect(() => {
    performSenderPropertiesFetch({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, []);

  function onSenderProperties(data) {
    setSenderProperties(data.data);
  }

  function onSwapSuccess() {
    setSuccessMsg("The request was sent successfully");
    setFormData({
      senderPropertyID: "",
      startDate: "",
      endDate: "",
      message: "",
    });
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });

    if (id === "senderPropertyID") {
      const selectedProperty = senderProperties.find(
        (property) => property._id === value,
      );

      if (selectedProperty) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          senderPropertyID: selectedProperty._id,
        }));
      }
    }

    if (senderProperties.length === 1 && id !== "senderPropertyID") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        senderPropertyID: senderProperties[0]._id,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const today = new Date().toISOString().split("T")[0];

    //Validations:
    if (formData.startDate < today || formData.endDate < today) {
      alert("Start date cannot be a date in the past");
      return;
    }

    if (formData.startDate > formData.endDate) {
      alert("End date must be after start date");
      return;
    }

    if (formData.senderPropertyID === receiver_propertyID) {
      alert("You cannot apply for this property");
      return;
    }

    if (formData.startDate === formData.endDate) {
      alert("Please select different dates");
      return;
    }

    const swapRequest = {
      sender_propertyId: formData.senderPropertyID,
      receiver_propertyId: receiver_propertyID,
      swap_date: {
        start: formData.startDate,
        end: formData.endDate,
      },
      status: "pending",
      message: formData.message,
    };

    performSwapFetch({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(swapRequest),
    });
  };

  return (
    <div className="swap-request-container">
      <h4>Swap Request Form</h4>
      {isLoading ? (
        <p>Loading properties...</p>
      ) : error ? (
        <p>{error}</p>
      ) : userPropertiesError ? (
        <p>Error fetching Properties: {userPropertiesError}</p>
      ) : !successMsg ? (
        <form onSubmit={handleSubmit} className="swap-request-form">
          {senderProperties.length > 1 && (
            <select
              id="senderPropertyID"
              value={formData.senderPropertyID}
              onChange={handleChange}
              required
              className="select-property-dropdown"
            >
              <option value="" disabled>
                Select a property:{" "}
              </option>
              {senderProperties.map((property) => (
                <option key={property._id} value={property._id}>
                  {property.title}
                </option>
              ))}
            </select>
          )}
          <div className="dates-container">
            <div className="swap-req-date-container">
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                id="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="date-input-swap-request"
              />
            </div>
            <div className="swap-req-date-container">
              <label htmlFor="endDate">End Date</label>
              <input
                type="date"
                id="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <textarea
            id="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message (Optional)"
            className="text-area-swap-form"
            cols="30"
            rows="5"
          />
          <button type="submit" className="btn-default submit-swap-request">
            Submit
          </button>
        </form>
      ) : (
        <p>{successMsg}</p>
      )}
    </div>
  );
}

CreateSwapRequest.propTypes = {
  receiver_propertyID: PropTypes.string.isRequired,
};

export default CreateSwapRequest;
