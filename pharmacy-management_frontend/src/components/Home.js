// Home.js
import React from 'react';
import './Home.css'; // Import the CSS file
import doctorImage from '../Image/s.png'; // Adjust the path if necessary

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Serving Your Health Needs Is Our Priority.</h1>
          <p>There is nothing more important than our good health, cause that's our principal capital asset for our good future.</p>
          <button className="appointment-button">Make Appointment</button>
        </div>
        <div className="hero-image">
          <img src={doctorImage} alt="Doctor" />
        </div>
      </div>
      <div className="info-section">
        <div className="info-box">
          <h3>dr. Anna Lindemann</h3>
          <p>General Practitioners</p>
        </div>
        <div className="info-box">
          <h3>7 Years</h3>
          <p>Experience</p>
        </div>
        <div className="info-box">
          <h3>Waraso Hospital</h3>
          <p>Place of Service</p>
        </div>
      </div>
      <div className="items-section">
        <h2>Our Products</h2>
        <div className="items-grid">
          <div className="item-card">
            <img src="https://demo2wpopal.b-cdn.net/pharmacy/wp-content/uploads/2014/08/a1.jpg" alt="Item 1" />
            <h3>Cream-Colored luctus pulvinar</h3>
            <p>£120.00</p>
          </div>
          <div className="item-card">
            <img src="https://th.bing.com/th/id/OIP.MI2yYD8q-v4RxKWOlzazLAHaKR?pid=ImgDet&w=166&h=230&c=7" alt="Item 2" />
            <h3>Cream Colored</h3>
            <p>£210.00 - £330.00</p>
          </div>
          <div className="item-card">
            <img src="https://th.bing.com/th/id/OIP.tNDSSVCion_mzzJEud8VYgAAAA?pid=ImgDet&w=166&h=186&c=7" alt="Item 3" />
            <h3>Donkey Kong</h3>
            <p>£250.00</p>
          </div>
          <div className="item-card">
            <img src="https://demo2wpopal.b-cdn.net/pharmacy/wp-content/uploads/2014/08/a6.jpg" alt="Item 4" />
            <h3>Southside Scrappers</h3>
            <p>£120.00</p>
          </div>
          <div className="item-card">
            <img src="https://th.bing.com/th/id/OIP.JD-GrIget04nHFypGfRvMAHaLG?pid=ImgDet&w=131&h=196&c=7" alt="Item 5" />
            <h3>Seiko Men's skx007</h3>
            <p>£250.00</p>
          </div>
          <div className="item-card">
            <img src="https://th.bing.com/th/id/OIP.3GlJDQjH0UCk_85BaPghswAAAA?pid=ImgDet&w=136&h=212&c=7" alt="Item 6" />
            <h3>Happy Ninja</h3>
            <p>£180.00</p>
          </div>
        </div>
      </div>
      <div className="items-section">
        <h2>Our Services</h2>
        <div className="items-grid">
          <div className="item-card">
            <img src="https://th.bing.com/th/id/OIP.mvvDU0Svnlvcv3UMcpLG6gHaE7?w=209&h=180&c=7&r=0&o=5&pid=1.7" alt="Item 1" />
            <h3>Medication Dispensing</h3>
            <p>Pharmacists and pharmacy technicians dispense prescribed medications accurately and provide appropriate dosage instructions to patients.</p>
          </div>
          <div className="item-card">
            <img src="https://th.bing.com/th/id/OIP.HYB4viwbwLFFW4VEGP71RgHaFj?w=197&h=180&c=7&r=0&o=5&pid=1.7" alt="Item 2" />
            <h3>Medication Counseling</h3>
            <p>Pharmacists offer counseling to patients on how to take medications properly, including dosage instructions, potential side effects, and interactions with other drugs</p>
          </div>
          <div className="item-card">
            <img src="https://th.bing.com/th/id/OIP.59leNsCDKFlDP3s9Biz5xwHaFj?w=245&h=184&c=7&r=0&o=5&pid=1.7" alt="Item 3" />
            <h3>Immunizations</h3>
            <p>Many pharmacies offer immunization services, providing vaccines for influenza, pneumonia, shingles, and other preventable diseases.</p>
          </div>
          <div className="item-card">
            <img src="https://th.bing.com/th/id/OIP.hShf91l_4aqRwur0VY-uLgHaE8?w=274&h=183&c=7&r=0&o=5&pid=1.7" alt="Item 4" />
            <h3>Medication Review</h3>
            <p>Pharmacists review patients' medication profiles to identify potential drug interactions, duplications, or other issues that may impact therapy outcomes.</p>
          </div>
          <div className="item-card">
            <img src="https://th.bing.com/th/id/OIP.G0kOcA7mKyQu8d-iNIR_9AHaFd?w=223&h=180&c=7&r=0&o=5&pid=1.7" alt="Item 5" />
            <h3>Compounding</h3>
            <p> Compounding pharmacies prepare customized medications tailored to individual patient needs, such as altering dosage forms or removing allergens.</p>
          </div>
          <div className="item-card">
            <img src="https://th.bing.com/th/id/OIP.8ATj1hO0OkOPAuqndGkZ6wHaE8?w=262&h=180&c=7&r=0&o=5&pid=1.7" alt="Item 6" />
            <h3>Health Screenings</h3>
            <p>Some pharmacies offer health screenings for conditions like blood pressure, cholesterol, and diabetes to promote early detection and prevention.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
