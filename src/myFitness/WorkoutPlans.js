import React, { useState, useEffect } from "react";
import axios from "axios";
import "./WorkoutPlans.css";
import { FaArrowLeft } from "react-icons/fa";

function WorkoutPlans() {
    const questions = [
        {
            id: "BodyPart",
            question: "Which body part do you want to focus on?",
            options: ["Biceps", "Chest", "Abdominals", "Glutes", "Hamstrings", "Lats", "Quadriceps", "Shoulders", "Triceps"],
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
            options: ["Body Only", "Dumbbell", "Barbell", "E-Z Curl Bar", "Bands", "Exercise Ball", "Cable", "Machine", "Kettlebells", "Foam Roll", "Medicine Ball", "None", "Other"],
        },
        {
            id: "Environment",
            question: "Where will you be doing your workouts?",
            options: ["Home", "Gym", "Outdoors"],
        },
        {
            id: "Goal",
            question: "What is your primary fitness goal?",
            options: ["Lose Weight", "Build Muscle", "Improve Endurance", "Increase Flexibility", "Rehabilitation"],
        },
        {
            id: "IncludeWarmupCooldown",
            question: "Do you want to include warm-up and cool-down exercises?",
            options: ["Yes", "No"],
        }
    ];

    const userId = localStorage.getItem('id');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [recommendedExercises, setRecommendedExercises] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingPastPlan, setLoadingPastPlan] = useState(true);

    useEffect(() => {
        const fetchPastPlan = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/workout/latest/${userId}`);
                if (response.data && response.data.exercises) {
                    setRecommendedExercises(response.data.exercises);
                }
            } catch (error) {
                console.error("Error fetching past workout plan:", error);
            } finally {
                setLoadingPastPlan(false);
            }
        };

        fetchPastPlan();
    }, [userId]);

    const handleOptionChange = (questionId, option) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [questionId]: option,
        }));
    };

    const handleNextClick = async () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            try {
                setLoading(true);
                const fitnessResponse = await axios.get(`http://localhost:5000/fitness/latest/${userId}`);
                const latestFitness = fitnessResponse.data[0] || {};

                const requestData = {
                    ...selectedAnswers,
                    user_id: userId,
                    bmi: latestFitness.bmi || null,
                    whr: latestFitness.whr || null,
                };

                const response = await axios.post("http://localhost:5000/recommendations", requestData);
                setRecommendedExercises(response.data.exercises);
            } catch (error) {
                console.error("Error fetching workout plan:", error);
                alert("An error occurred while fetching your workout plan.");
            } finally {
                setLoading(false);
            }
        }
    };

    const handleBackClick = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const handleGenerateNew = () => {
        setRecommendedExercises(null);
        setCurrentQuestionIndex(0);
        setSelectedAnswers({});
    };

    if (loadingPastPlan) {
        return <div className="workout-plans"><p>Loading...</p></div>;
    }

    return (
        <div className="workout-plans">
            {!recommendedExercises && <h2>Workout Plans Questionnaire</h2>}

            {loading ? (
                <p>Loading your personalized workout plan...</p>
            ) : recommendedExercises ? (
                <div>
                    <h3 className="plan-title">Your Personalized Workout Plan</h3>

                    {recommendedExercises.warmup?.length > 0 && (
                        <div>
                            <h4 className="section-title">Warm-up Exercises</h4>
                            <ul className="exercise-list">
                                {recommendedExercises.warmup.map((exercise, index) => (
                                    <li className="warmup" key={`warmup-${index}`}><strong>{exercise}</strong></li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {recommendedExercises.main?.length > 0 && (
                        <div>
                            <h4 className="section-title">Main Exercises</h4>
                            <ul className="exercise-list">
                                {recommendedExercises.main.map((exercise, index) => (
                                    <li className="main" key={`main-${index}`}><strong>{exercise}</strong></li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {recommendedExercises.cooldown?.length > 0 && (
                        <div>
                            <h4 className="section-title">Cool-down Exercises</h4>
                            <ul className="exercise-list">
                                {recommendedExercises.cooldown.map((exercise, index) => (
                                    <li className="cooldown" key={`cooldown-${index}`}><strong>{exercise}</strong></li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <button onClick={handleGenerateNew}>Generate New Plan</button>
                </div>
            ) : (
                <div className="question-container">
                    {currentQuestionIndex > 0 && (
                        <button className="back-button" onClick={handleBackClick}>
                            <FaArrowLeft /> Back
                        </button>
                    )}
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
