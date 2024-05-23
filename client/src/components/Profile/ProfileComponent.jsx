import React, { useEffect, useState } from "react";
import addIcon from "../../assets/icon-add.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Nav from "../Nav/Nav";
import "./ProfileComponent.css";
import { Link } from "react-router-dom";
import ProfilePropertyList from "../ProfilePropertyList/ProfilePropertyList";
import { useLogin } from "../../context/LogInProvider/LogInProvider";
import useFetch from "../../hooks/useFetch";

function ProfileComponent() {
  const { userId, token, setUserProperties, username } = useLogin();

  const onReceived = (data) => {
    setUserProperties(data.data);
  };

  const { performFetch } = useFetch(`/user/properties/${userId}`, onReceived);
  const [activeTab, setActiveTab] = useState("My properties");
  const myProperties = activeTab === "My properties";
  const myRequests = activeTab === "My requests";

  useEffect(() => {
    // hardcoded because for now we don't have that data available
    if (activeTab === "My requests") {
      setUserProperties([]);
    } else {
      // including bearer token from session bc otherwise there will be an unauthorized response from the endpoint
      performFetch({ headers: { Authorization: `Bearer ${token}` } });
    }
  }, [activeTab]);

  // change activeTab state to the text content of button clicked so that active className can be applied (default is "My properties')
  const handleClick = (e) => {
    setActiveTab(e.target.textContent);
  };

  return (
    <>
      <Nav />
      <div className="add-profile-page">
        <button className="add-to-profile">
          <Link to={"/property/upload"}>
            <img src={addIcon} alt="add button" />
          </Link>
        </button>
        <div className="card-and-list-container">
          <div className="card-container">
            <div className="upper-container">
              <div className="image-container">
                <FontAwesomeIcon icon={faUser} className="user-pic-icon" />
              </div>
            </div>
            <div className="lower-container">
              <div>
                <h4>{username}</h4>
              </div>
              <div className="tab-btns-container">
                <button
                  onClick={handleClick}
                  className={`${myProperties ? "active-tab-profile" : ""} profile-tabs-btn`}
                >
                  My properties
                </button>
                <button
                  onClick={handleClick}
                  className={`${myRequests ? "active-tab-profile" : ""} profile-tabs-btn`}
                >
                  My requests
                </button>
              </div>
            </div>
          </div>
          <ProfilePropertyList />
        </div>
      </div>
    </>
  );
}
export default ProfileComponent;
