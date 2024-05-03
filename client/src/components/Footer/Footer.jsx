import React from "react";
import "./Footer.css";
import logo from "../../assets/logo.png";

function Footer() {
  return (
    <div>
      <div className="footer">
        <div className="footer-container">
          <div className="log-footer">
            <div className="log-footer-container">
              <img
                src={logo}
                alt="homeswap-high-resolution-logo-2-720"
                border="0"
              />
              <p>Perfect spaces for your needs</p>
            </div>
          </div>

          <div className="contact-info">
            <div className="contact-info-h">Contact</div>
            <div className="contact-info-items">
              <a href="mailto:alioth840@gmail.com">Mail</a>
              <p>Phone +92 302 4606680</p>
            </div>
          </div>
          <div className="footer-menu contact-info">
            <div className="footer-menu-h contact-info-h">Areas</div>
            <div className="footer-menu-links contact-info-items">
              <p className="footer-menu-area-items">Syria</p>
              <p className="footer-menu-area-items">Egypt</p>
              <p className="footer-menu-area-items">Nicaragua</p>
              <p className="footer-menu-area-items">Zimbabwe</p>
              <p className="footer-menu-area-items">Nederland</p>
              <p className="footer-menu-area-items">Spain</p>
            </div>
          </div>

          <div className="footer-menu area">
            <div className="footer-menu-h area-h2">Areas</div>
            <div className="footer-menu-area area2 ">
              <p className="footer-menu-area-items">Germany</p>
              <p className="footer-menu-area-items">Italy</p>
              <p className="footer-menu-area-items">Greece</p>
              <p className="footer-menu-area-items">Hungary</p>
              <p className="footer-menu-area-items">Finland</p>
              <p className="footer-menu-area-items">Sweden</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="left-footer-bottom">
            <div className="Subscribe-button">
              <p>Nederland</p>
            </div>
          </div>
          <div className="icons">
            <i className="fab fa-instagram"></i>
            <i className="fab fa-facebook"></i>
            <i className="fab fa-twitter"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
