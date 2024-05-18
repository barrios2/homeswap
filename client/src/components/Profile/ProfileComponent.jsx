import React from "react";
import profileNavigateBackIcon from "../../assets/icon-navigate-back.svg";
import addIcon from "../../assets/icon-add.svg";
import "./ProfileComponent.css";
import { Link } from "react-router-dom";

function ProfileComponent() {
  return (
    <div className="add-profile-page">
      <div className="profile-header1">
        <img
          src={profileNavigateBackIcon}
          alt="navigate back button"
          className="profile-navigate-back-icon"
        />
        <button className="my-requests-btn-profile">Requests</button>
        <button className="my-property-btn-profile">My Property</button>
      </div>
      <div className="profile-hero-wrapper">
        <div className="profile-hero">
          <h1 className="profile-hero-title">
            Find a home that suits your needs
          </h1>
        </div>
      </div>
      <button className="add-to-profile">
        <Link to={"/property/upload"}>
          <img src={addIcon} alt="add button" />
        </Link>
      </button>
    </div>
  );
}
export default ProfileComponent;
