import React from "react";
import WorkoutPlans from "../images/personalized_workout_plans.jpg";
import Meetings from "../images/schedule_meetings.jpg";
import Progress from "../images/progress_tracking.jpg";
import Support from "../images/support.jpg";

// import DeliveryMeals from "../Assets/delivery-image.png";
// import Navbar from "./Navbar";

const Work = () => {
  const workInfoData = [
    {
      image: WorkoutPlans,
      title: "Personalized Workout Plans",

    },
    {
      image: Meetings,
      title: "Schedule Online Meetings with Personal Trainers",

    },
    {
      image: Progress,
      title: "Progress Tracking",

    },
    {
      image: Support,
      title: "Support Till The End",

    },
  ];
  return (
    <>


    <div className="work-section-wrapper">
      <div className="work-section-top">
        <h1 className="primary-heading-1">Services</h1>
        <p className="primary-text">
          We are here to help you. You can get below services from us. We are
          always happy to help you.
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container card">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Work;
