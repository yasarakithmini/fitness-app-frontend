import React, { useState } from "react";
import axios from "axios";
import "./WorkoutPlans.css"; // Optional styling file
import Sidebar from "./Sidebar";

function WorkoutPlans() {
    const questions = [
        {
            id: "BodyPart",
            question: "Which body part do you want to focus on?",
            options: ["Abductors", "Biceps", "Chest", "Forearms", "Abdominals", "Glutes", "Hamstrings", "Lats", "Lower Back","Middle Back","Traps","Neck","Quadriceps","Shoulders","Triceps"],
        },
        {
            id: "Type",
            question: "What type of workout are you interested in?",
            options: ["Strength", "Cardio", "Stretching", "Plyometrics", "Powerlifting", "Strongman", "Olympic Weightlifting"],
        },
        {
            id: "Level",
            question: "How would you describe your current fitness level?",
            options: ["Beginner", "Intermediate", "Expert"],
        },
        {
            id: "Equipment",
            question: "What type of equipment do you prefer?",
            options: ["Body Only", "Dumbbell", "Barbell","E-Z Curl Bar", "Bands", "Exercise Ball", "Cable", "Machine", "Kettlebells", "Foam Roll", "Medicine Ball", "None", "Other"],
        },
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [recommendedExercises, setRecommendedExercises] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleOptionChange = (questionId, option) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionId]: option,
        });
    };

    const handleNextClick = async () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            try {
                setLoading(true);
                console.log("Sending request to backend with:", selectedAnswers);

                const response = await axios.post("http://localhost:5000/recommendations", selectedAnswers);

                console.log("Received response:", response.data);
                setRecommendedExercises(response.data.exercises);
            } catch (error) {
                console.error("Error fetching workout plan:", error);
                alert("An error occurred while fetching your workout plan.");
            } finally {
                setLoading(false);
            }
        }
    };


    return (
        <div className="workout-plans">
            <Sidebar />
            {!recommendedExercises && <h2>Workout Plans Questionnaire</h2>}
            {loading ? (
                <p>Loading your personalized workout plan...</p>
            ) : recommendedExercises ? (
                <div>
                    <h3>Your Personalized Workout Plan:</h3>
                    <ul>
                        {recommendedExercises.map((exercise, index) => (
                            <li key={index}>
                                <strong>{exercise}</strong>  {/* Directly render exercise name */}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="question-container">
                    <h3>{questions[currentQuestionIndex].question}</h3>
                    <ul>
                        {questions[currentQuestionIndex].options.map((option) => (
                            <li key={option}>
                                <label>
                                    <input
                                        type="radio"
                                        name={`question-${questions[currentQuestionIndex].id}`}
                                        value={option}
                                        checked={selectedAnswers[questions[currentQuestionIndex].id] === option}
                                        onChange={() => handleOptionChange(questions[currentQuestionIndex].id, option)}
                                    />
                                    {option}
                                </label>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleNextClick}>
                        {currentQuestionIndex < questions.length - 1 ? "Next" : "Submit"}
                    </button>
                </div>
            )}
        </div>
    );
}

export default WorkoutPlans;
