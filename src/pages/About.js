import React from 'react';
import './About.css';
// import Navbar from "./Navbar";

const About = () => {
  return (
      <>

    <main className="about">
      <br/><br/><br/>
      <div className="box">
        <h3 className="section-title">About Us</h3>
        <p className="description">
          At FixFit, we're dedicated to helping you achieve your fitness goals with personalized workout plans and expert guidance. Our app provides convenient access to tailored exercises and virtual coaching, making it easy to stay fit anywhere, anytime.
        </p>
        <h3 className="section-title">Our Mission</h3>
        <p className="description">
          To empower you to lead a healthier, more active lifestyle through accessible and personalized fitness solutions.
        </p>
        <h3 className="section-title">What We Offer</h3>
        <p className="description">

          <li>Customized Workouts: Plans tailored to your goals and fitness level.</li>
          <li>Virtual Coaching: Online sessions with experienced trainers.</li>
          <li>Progress Tracking: Easily monitor your achievements and milestones.</li>
        </p>
        <h3 className="section-title">Join Us</h3>
        <p className="description">
          Start your fitness journey with FixFit today and transform your life one workout at a time!

        </p>
      </div>
      <br/> <br/> <br/>
    </main>
      </>
  );
};

export default About;
