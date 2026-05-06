import { useState, useEffect } from "react";
import "./about.css";
import heroImg from "../assets/hero-ramen.png";



function AboutUs() {
  

  return (
    <div className="about-page">
      <div className="hero">
        <img src={heroImg} alt="Ichiramen Neon Sign" />
        <div className="hero-text">
          <h1>IchiraMen</h1>
          <p>Digital Ramen Dining Experience</p>
        </div>
      </div>

      <div className="card-grid">
        <div className="info-card">
          <h2>Our Story</h2>
          <p>IchiraMen recreates the modern ramen shop experience where customers browse and order directly from a tablet for a seamless dining flow.</p>
        </div>

        <div className="info-card">
          <h2>The Experience</h2>
          <ul>
            <li>Visual menu browsing</li>
            <li>Step-by-step ordering</li>
            <li>Cart review before checkout</li>
            <li>Fast and accurate service</li>
          </ul>
        </div>

        <div className="info-card">
          <h2>Built With</h2>
          <p>This full-stack application uses React for the frontend and Node/Express for backend APIs to simulate real restaurant ordering systems.</p>
        </div>
      </div>

      
    </div>
  );
}

export default AboutUs;