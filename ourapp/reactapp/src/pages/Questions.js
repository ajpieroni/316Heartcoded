import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Questions.css";
import { UserContext } from "../components/contexts/UserContext";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function Questions() {
  const { user, setUser } = useContext(UserContext);
  const [question, setQuestion] = useState(null);
  const [rating, setRating] = useState(null);
  const [questionGenerated, setQuestionGenerated] = useState(false);
  const[isButtonSelected, setIsButtonSelected] = useState(false);

  console.log("gimme id:", user.id);
  setUser(user);
  const fetchQuestion = () => {
    axios
      .get(`http://localhost:3000/questions/unanswered_questions/${user.id}`) 
      //TODO: maybe put the logic in the backend
      .then((response) => {
        console.log("response:", response.data.length);
        const random = Math.floor(Math.random() * response.data.length); //random num from 0 to response.length-1
        setQuestion(response.data[random]);
        setRating(null);
        setQuestionGenerated(true);
      })
      .catch((error) => {
        console.error("Error fetching a random question:", error);
      });
  };

  const handleResponse = (response) => {
    setRating(response);
    setIsButtonSelected(true);
  };

  const saveResponse = () => {
    // Implement the logic to save the user's response here
    console.log("User response:", rating);
    if (rating !== null) {
      const test_user_id = user.id;
      const question_id = question.id;
      const answer = rating;
      const requestData = {
        answer: {
          test_user_id,
          question_id,
          answer,
        },
      };
      axios
        .post("http://localhost:3000/answers", requestData)
        .then((response) => {
          // Handle the response from the server, e.g., show a success message
          console.log("Response from server:", response.data);
          // Reset the selectedButton to null after saving
          setSelectedButton(null);
        })
        .catch((error) => {
          console.error("Error saving the response:", error);
        });
    } else {
      console.log("Please select a ranking before saving.");
    }
  };

  return (
    <main className="main-container">
      <h1 className="main-title">Answer Questions</h1>
      {question && (
        <div className="question-container">
          <h2 className="question-title">Question:</h2>
          <p className="question-text">{question.question}</p>
        </div>
      )}
      {questionGenerated && (
        <div className="response-container">
          <h2 className="response-title">Select a Ranking:</h2>
          <div className="response-buttons">
            <ButtonGroup 
            variant="contained"
            size="large">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((response) => (
                <Button
                  key={response}
                  onClick={() => handleResponse(response)}
                >
                  {response}
                </Button>
              ))}
            </ButtonGroup>
          </div>
        </div>
      )}
      <Button variant="contained" className="generate-button" onClick={fetchQuestion}>
        New Question
      </Button>
      <Button variant="contained" className="generate-button" onClick={saveResponse}>
        Save Response
      </Button>
    </main>
  );
}
