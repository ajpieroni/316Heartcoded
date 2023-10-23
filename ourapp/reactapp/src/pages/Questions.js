import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Questions.css";

export default function Questions() {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [questionGenerated, setQuestionGenerated] = useState(false);
  const random = Math.floor(Math.random() * 6) + 1

  const fetchQuestion = () => {
    axios
      .get(`http://localhost:3000/questions/${random}`) 
      .then((response) => {
        setQuestion(response.data.question);
        setAnswer(null);
        setQuestionGenerated(true);
      })
      .catch((error) => {
        console.error("Error fetching a random question:", error);
      });
  };

  const handleResponse = (response) => {
    setAnswer(response);
  };

  const saveResponse = () => {
    // Implement the logic to save the user's response here
    console.log("User response:", answer);
    fetchQuestion();
  };

  return (
    <main className="main-container">
      <h1 className="main-title">Answer Questions</h1>
      {question && (
        <div className="question-container">
          <h2 className="question-title">Question:</h2>
          <p className="question-text">{question}</p>
        </div>
      )}
      {questionGenerated && (
        <div className="response-container">
          <h2 className="response-title">Select a Ranking:</h2>
          <div className="response-buttons">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((response) => (
              <button
                key={response}
                className="response-button"
                onClick={() => handleResponse(response)}
              >
                {response}
              </button>
            ))}
          </div>
          <button className="save-button" onClick={saveResponse}>
            Save Response
          </button>
        </div>
      )}
      <button className="generate-button" onClick={fetchQuestion}>
        Generate New
      </button>
    </main>
  );
}
