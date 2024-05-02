import React from "react";
import AboutUsContent from "../../components/AboutUsContent/AboutUsContent";
import "./AboutUs.css";
import Nav from "../../components/Nav/Nav";

const AboutUs = () => {
  return (
    <div className="about-us-page">
      <Nav />
      <AboutUsContent />
    </div>
  );
};

export default AboutUs;
