import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../components/contexts/UserContext";
// import bcrypt from 'bcryptjs';
import Header from "../components/Header";

export default function Wrapped() {
  const [question, setQuestion] = useState("UNINIT");
  const [testUser, setTestUser] = useState("UNINIT");
  const [error, setError] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState("");
  const [mostValuedCategory, setMostValuedCategory] = useState([]);
  const [leastValuedCategory, setLeastValuedCategory] = useState([]);
  const [mostValuedFeedback, setmostValuedFeedback] = useState([]);
  

  const fetchQuestions = () => {
    axios
      .get(` http://localhost:3000/answered_questions_count/${user?.id}`)
      .then((response) => {
        console.log(response.data);
        setQuestionsAnswered(response.data.answered_question_count);
      })
      .catch((error) => {
        console.error("Error fetching the messages:", error);
      });
  };
  const fetchMostValuedCategory = () => {
    axios
      .get(`http://localhost:3000/user_most_valued_category/${user?.id}`)
      .then((response) => {
        console.log("here category", response.data);
        console.log("here parsed", response.data.category_descriptors);

        setMostValuedCategory(response.data.category_descriptors);
        console.log("here set value", mostValuedCategory);
      })
      .catch((error) => {
        console.error("Error fetching the messages:", error);
      });
  };
  const fetchLeastValuedCategory = () => {
    axios
      .get(`http://localhost:3000/user_least_valued_category/${user?.id}`)
      .then((response) => {
        console.log("here new",response.data.category_descriptors )
        setLeastValuedCategory(response.data.category_descriptors);
      })
      .catch((error) => {
        console.error("Error fetching the messages:", error);
      });
  };

  const fetchMostValuedFeedback = () => {
    axios
      .get(`http://localhost:3000/user_most_valued_feedback/${user?.id}`)
      .then((response) => {
        console.log("here new!!!",response.data )
        setmostValuedFeedback(response.data.categories)
      })
      .catch((error) => {
        console.error("Error fetching the messages:", error);
      });
  };

  

  

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLogin(true);
    }
  }, []);

  useEffect(() => {
    console.log('feed:', mostValuedFeedback);
  }, [mostValuedFeedback]);
  
  useEffect(() => {
    if (user && user.id) {
      fetchQuestions();
      fetchMostValuedCategory();
      fetchLeastValuedCategory();
      fetchMostValuedFeedback();

      
    }
  }, [user]);

  return (
    <div>
      <Header />

      <main className="main-container">
        <h1>{user?.name}'s Wrapped</h1>
        <h2>Questions Answered: {questionsAnswered}</h2>
        <h2>Most Valued Categories:</h2>
        <ul>
          {/* Directly map over mostValuedCategory */}
          {mostValuedCategory.map((descriptor, index) => (
            <li key={index}>{descriptor}</li>
          ))}
        </ul>
        <h2>Least Valued Categories:</h2>
        <ul>
          {/* Directly map over mostValuedCategory */}
          {leastValuedCategory.map((descriptor, index) => (
            <li key={index}>{descriptor}</li>
          ))}
        </ul>
        <h2>Most Valued Feedback:</h2>
        <ul>
        {mostValuedFeedback.map((item, index) => (
          <li key={index}>
            Descriptor: {item.descriptor}, Feedback: {item.feedback*100}%
          </li>
        ))}
      </ul>
      </main>
    </div>
  );
}
