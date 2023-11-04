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

  useEffect(() => {
    if (user?.id) {
      fetchQuestion();
    }
  }, [user?.id]);
  

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
          fetchQuestion();
          // Reset the selectedButton to null after saving
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
            size="large"
            color="primary">
              <Button color={rating === 1 ? "secondary" : "primary"} onClick={() => setRating(1)}>1</Button>
              <Button color={rating === 2 ? "secondary" : "primary"} onClick={() => setRating(2)}>2</Button>
              <Button color={rating === 3 ? "secondary" : "primary"} onClick={() => setRating(3)}>3</Button>
              <Button color={rating === 4 ? "secondary" : "primary"} onClick={() => setRating(4)}>4</Button>
              <Button color={rating === 5 ? "secondary" : "primary"} onClick={() => setRating(5)}>5</Button>
              <Button color={rating === 6 ? "secondary" : "primary"} onClick={() => setRating(6)}>6</Button>
              <Button color={rating === 7 ? "secondary" : "primary"} onClick={() => setRating(7)}>7</Button>
              <Button color={rating === 8 ? "secondary" : "primary"} onClick={() => setRating(8)}>8</Button>
              <Button color={rating === 9 ? "secondary" : "primary"} onClick={() => setRating(9)}>9</Button>
              <Button color={rating === 10 ? "secondary" : "primary"} onClick={() => setRating(10)}>10</Button>
            </ButtonGroup>
          </div>
        </div>
      )}
      <Button variant="contained" className="generate-button" onClick={fetchQuestion}>
        Skip
      </Button>
      <Button variant="contained" className="generate-button" onClick={saveResponse}>
        Save Response
      </Button>
    </main>
  );
}
