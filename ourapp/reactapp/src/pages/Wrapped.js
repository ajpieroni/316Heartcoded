import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../components/contexts/UserContext";
// import bcrypt from 'bcryptjs';



export default function Wrapped() {
  const [question, setQuestion] = useState("UNINIT");
  const [testUser, setTestUser] = useState("UNINIT");
  const [error, setError] = useState(null);
  const {user, setUser} = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState("")
  const [mostValuedCategory, setMostValuedCategory] = useState("");

  const fetchQuestions = () => {
    axios
      .get(` http://localhost:3000/answered_questions_count/${user?.id}`)
      .then((response) => {
        console.log(response.data)
        setQuestionsAnswered(response.data.answered_question_count)
      })
      .catch((error) => {
        console.error("Error fetching the messages:", error);
      });
  };
  const fetchMostValuedCategory = () => {
    axios
      .get(`http://localhost:3000/user_most_valued_category/${user?.id}`)
      .then((response) => {
        console.log(response.data)
        setMostValuedCategory(response.data.answered_question_count)
      })
      .catch((error) => {
        console.error("Error fetching the messages:", error);
      });
  };
  
  


  useEffect(() => {
    // Check if there's user data in sessionStorage on component initialization
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLogin(true);
      if(user.id){
        fetchQuestions();
        fetchMostValuedCategory();
      }
    }
    
  }, []);

  console.log(user?.id)

  


  return (
    <main className="main-container">
        <h1>{user?.name}'s Wrapped</h1>
        <h1>Questions Answered: {questionsAnswered}</h1>
        {/* <button onClick={fetchQuestions}>How many questions answered?</button> */}

     
    </main>
  );
}

