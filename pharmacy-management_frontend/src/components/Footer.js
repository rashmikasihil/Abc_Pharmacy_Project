// Footer.js
import React from 'react';
import './Footer.css'; // Use the same CSS file for styles
import QRImage from '../Image/QR.jpg'; // Adjust the path if necessary
import LogoImage from '../Image/logo.png'; // Adjust the path if necessary
import '@fortawesome/fontawesome-free/css/all.min.css';


function Footer() {
  return (
    <div className="footer">
      <div className="footerItem">
        <a href="#"><img className="QR" src={QRImage} alt="QR Code" /></a>
      </div>
      <div className="footerItem">
        <h3>ABOUT US</h3>
        <p>ToothCare is a Sri Lankan website that provides various services around the area. You can get convenient and efficient service from us.</p>
        <i className="fa-brands fa-google-play fa-2x"></i>
        <i className="fa-brands fa-app-store fa-2x"></i>
      </div>
      <div className="footerItem">
        <h3>CONTACT US</h3>
        <p>Tel: +94112666978<br />Fax: +94112666978<br />E-mail: info@ToothCare.net</p>
      </div>
      <div className="footerItem">
        <h3>FOLLOW US</h3>
        <div className="f_icon">
          <i className="fa-brands fa-facebook-f fa-2x"></i>
          <i className="fa-brands fa-instagram fa-2x"></i>
          <i className="fa-brands fa-twitter fa-2x"></i>
          <i className="fa-brands fa-google-plus-g fa-2x"></i>
        </div>
      </div>
      <div className="footerItem">
        <img className="f_logo" src={LogoImage} alt="Logo" />
      </div>
    </div>
  );
}

export default Footer;
