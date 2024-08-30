import React from "react";
//import BannerImage from "../Assets/home-banner-image.png";
import { useNavigate } from "react-router-dom";
import '../style.css'
// import Navbar from "./Navbar";

const Home = () => {
  const Navigate = useNavigate();
  
  return (
    <>

    
    <div className="home-container">
      <div className="home-banner-container">
        <div className="home-text-section">
          <h1 className="primary-heading">Do you Know?</h1>
          <p className="primary-text">
            Inconsistent Workout Routine can be a major barrier to achieving your fitness goals. It often stems from a lack of motivation, busy schedules, or not knowing where to start. This inconsistency can lead to feelings of frustration, low self-esteem, and stagnation in progress. Personalized workout plans and regular online meetings with a personal trainer can provide the guidance and accountability needed to stay on track.
            Let’s assess your current routine and find the right solution for you.
          </p>
          <button
            className="secondary-button-1"
            onClick={() => Navigate("/login")}
          >
            Get Started{" "}
          </button>
        </div>
        <div className="home-image-section">
          {/* <img className="card" src={BannerImage} alt="" /> */}
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;
