import React from "react";
import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useLogin } from "../../context/LogInProvider/LogInProvider";
import PropTypes from "prop-types";

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
      alert("Please select dates in the future");
      return;
    }

    if (formData.startDate > formData.endDate) {
      alert("Please select end date after start date");
      return;
    }

    if (formData.senderPropertyID === receiver_propertyID) {
      alert("Please select different properties");
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
    <div style={{ backgroundColor: "gray" }}>
      <h4>Swap Request Form</h4>
      {successMsg && <p style={{ color: "blue" }}>{successMsg}</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {isLoading && <p>Loading properties...</p>}
      {userPropertiesError && (
        <p>Error fetching Properties: {userPropertiesError}</p>
      )}

      <form onSubmit={handleSubmit}>
        {
          senderProperties.length > 1 && (
            <select
              id="senderPropertyID"
              value={formData.senderPropertyID}
              onChange={handleChange}
              required
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
          )
          //: <input type='hidden' name ="senderPropertyID" value={senderProperties[0]?.id || ''} />
        }

        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />

        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
        />
        <textarea
          id="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message (Optional)"
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

CreateSwapRequest.propTypes = {
  receiver_propertyID: PropTypes.string.isRequired,
};

export default CreateSwapRequest;
