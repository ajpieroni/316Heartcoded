import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Questions.css";
import { UserContext } from "../components/contexts/UserContext";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Header from "../components/Header";

export default function Questions() {
  const { user, setUser } = useContext(UserContext);
  const [question, setQuestion] = useState(null);
  const [rating, setRating] = useState(null);
  const [questionGenerated, setQuestionGenerated] = useState(false);
  useEffect(() => {
    // When the component mounts, check if the user is stored in sessionStorage
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    //   setLogin(true); // If necessary, set the login state
    }
  }, [setUser]); 


  console.log("gimme id:", user?.id);
  // setUser(user);
  const fetchQuestion = () => {
    axios
      .get(`http://localhost:3000/unanswered_questions/${user.id}`) 
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

  useEffect(() => {
    if (user?.id) {
      fetchQuestion();
    }
  }, [user?.id]);
  

  const saveResponse = () => {
    // Implement the logic to save the user's response here
    console.log("User response:", rating);
      const test_user_id = user.id;
      const question_id = question.id;
      const answer = rating || 0;
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
          fetchQuestion();
          // Reset the selectedButton to null after saving
        })
        .catch((error) => {
          console.error("Error saving the response:", error);
        });
  };

  const marks = [
    {
      value: 0,
      label: 'Not at all',
    },
    {value: 1}, {value: 2}, {value: 3}, {value: 4},
    {
      value: 5,
      label: 'Average amount',
    },
    {value: 6}, {value: 7}, {value: 8}, {value: 9},
    {
      value: 10,
      label: 'A lot',
    }
  ];

  return (
    <>
    <Header/>
    <h1 className="main-title">Answer Questions</h1>
    <main className="q-main-container">
      {question && (
        <div className="question-container">
          <h2 className="question-title">Question:</h2>
          <p className="question-text">{question.question}</p>
        </div>
      )}
      {questionGenerated && (
        <div className="response-container">
          <h2 className="response-title">Select a Ranking:</h2>
          <div className="response-slider">
            <Slider
              value={rating || 0}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              marks={marks}
              min={0}
              max={10}
              color="secondary"
              onChange={(event, newValue) => setRating(newValue)}
            />
          </div>
        </div>
      )}
      <div className="q-response-container">
      <button className="response-button" onClick={fetchQuestion}>
        Skip
      </button>
      <button className="response-button" onClick={saveResponse}>
        Save
      </button>
      </div>
    </main>
    </>
  );
}
