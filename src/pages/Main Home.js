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
          <h1 className="primary-heading">Struggling to stick to a workout routine?</h1>
          <p className="primary-text">
            You’re not alone. Busy schedules, low motivation, or just not knowing where to start can make it tough to stay consistent and that can be frustrating. But you don’t have to do it alone.
            With personalized workout plans and regular check-ins with a personal trainer, staying on track becomes easier and more motivating.
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
