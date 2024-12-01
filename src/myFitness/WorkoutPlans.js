// src/WorkoutPlans.js
import React, { useState } from 'react';
import './WorkoutPlans.css'; // Optional: Create this CSS file for styling
import './Sidebar';
import Sidebar from "./Sidebar";

function WorkoutPlans() {
    const questions = [
        {
            id: 1,
            question: "What is your primary fitness goal?",
            options: ["Lose Weight", "Build Muscle", "Increase Endurance", "Improve Flexibility"]
        },
        {
            id: 2,
            question: "Which body part do you want to focus on?",
            options: ["Chest", "Arms", "Legs", "Back", "Abs", "Shoulders", "Waist"]
        },
        {
            id: 3,
            question: "What type of equipment do you prefer to use?",
            options: ["Body weight", "Dumbbell", "Barbell", "Resistance Band", "Machine", "Kettlebell", "None"]
        },
        {
            id: 4,
            question: "How would you describe your current fitness level?",
            options: ["Beginner", "Intermediate", "Advanced"]
        },
        {
            id: 5,
            question: "What kind of workout duration or intensity do you prefer?",
            options: ["Short (15-30 mins)", "Moderate (30-45 mins)", "Long (45+ mins)", "High Intensity"]
        }
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});

    const handleOptionChange = (questionId, option) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionId]: option
        });
    };

    const handleNextClick = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            alert("You have completed the questionnaire!");
            // Optionally, you can handle the submission of answers here
            console.log("Selected Answers:", selectedAnswers);
            // Submit selectedAnswers to the backend for workout plan recommendation
        }
    };

    return (
        <div className="workout-plans">
            <Sidebar />
            <h2>Workout Plans Questionnaire</h2>
            <div className="question-container">
                <h3>{questions[currentQuestionIndex].question}</h3>
                <ul>
                    {questions[currentQuestionIndex].options.map(option => (
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
        </div>
    );
}

export default WorkoutPlans;
