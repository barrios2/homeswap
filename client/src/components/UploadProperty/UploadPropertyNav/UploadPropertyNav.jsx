import React from "react";
import { Link } from "react-router-dom";
import "./UploadPropertyNav.css";

function UploadPropertyNav() {
  return (
    <>
      <nav className="nav-item-upload-property-nav">
        <div>
          <Link to={"/home"} className="link-to-home-nav">
            Back Home
          </Link>
        </div>
        <ul className="property-nav-ul">
          <li> </li>
          <li>My Request</li>
          <li>Profile</li>
        </ul>
      </nav>
    </>
  );
}

export default UploadPropertyNav;
