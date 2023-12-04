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
  const [leastValuedFeedback, setLeastValuedFeedback] = useState([]);
  const [numMatch, setNumMatched] = useState("");
  const [numUnMatch, setNumUnMatched] = useState("");
  const [numMessSent, setNumMessSent] = useState("");
  const [numMessGot, setNumMessGot] = useState("");
  const [topMessaged, setTopMessaged] = useState([]);
  const [topMessGot, setTopMessGot] = useState([]);

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
        console.log("here new", response.data.category_descriptors);
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
        setmostValuedFeedback(response.data.categories);
      })
      .catch((error) => {
        console.error("Error fetching the messages:", error);
      });
  };

  const fetchLeastValuedFeedback = () => {
    axios
      .get(`http://localhost:3000/user_least_valued_feedback/${user?.id}`)
      .then((response) => {
        setLeastValuedFeedback(response.data.categories);
      })
      .catch((error) => {
        console.error("Error fetching the messages:", error);
      });
  };

  const fetchNumMatched = () => {
    axios
      .get(`http://localhost:3000/num_matches_historic/${user?.id}`)
      .then((response) => {
        setNumMatched(response.data.num_matches);
      })
      .catch((error) => {
        console.error("Error fetching the messages:", error);
      });
  };

  const fetchNumUnMatched = () => {
    axios
      .get(`http://localhost:3000/num_unmatches/${user?.id}`)
      .then((response) => {
        console.log("here new!!!", response.data);
        setNumUnMatched(response.data.num_unmatches);
      })
      .catch((error) => {
        console.error("Error fetching the messages:", error);
      });
  };

  const fetchNumMessSent = () => {
    axios
      .get(`http://localhost:3000/messages/num_messages_sent/${user?.id}`)
      .then((response) => {
        console.log("here new!!! ALERT", response.data);
        setNumMessSent(response.data.messages_count);
      })
      .catch((error) => {
        console.error("Error fetching the messages:", error);
      });
  };

  const fetchNumMessGot = () => {
    axios
      .get(`http://localhost:3000/messages/num_messages_gotten/${user?.id}`)
      .then((response) => {
        console.log("here new!!!", response.data);
        setNumMessGot(response.data.messages_count);
      })
      .catch((error) => {
        console.error("Error fetching the messages:", error);
      });
  };
 

  const fetchTopMess = () => {
    axios
      .get(`http://localhost:3000/messages/top_three_messaged_users/${user?.id}`)
      .then((response) => {
        setTopMessaged(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the messages:", error);
      });
  };

  const fetchTopMessGot = () => {
    axios
      .get(`http://localhost:3000/messages/top_three_mess_users/${user?.id}`)
      .then((response) => {
        setTopMessGot(response.data);
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
    console.log("feed:", mostValuedFeedback);
  }, [mostValuedFeedback]);

  useEffect(() => {
    if (user && user.id) {
      fetchQuestions();
      fetchMostValuedCategory();
      fetchLeastValuedCategory();
      fetchMostValuedFeedback();
      fetchLeastValuedFeedback();
      fetchNumMatched();
      fetchNumUnMatched();
      fetchNumMessSent();
      fetchNumMessGot();
      fetchTopMess();
      fetchTopMessGot();
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
              Category: {item.descriptor}, Feedback: {item.feedback * 100}%
            </li>
          ))}
        </ul>
        <h2>Least Valued Feedback</h2>
        <ul>
          {leastValuedFeedback.map((item, index) => (
            <li key={index}>
              Category: {item.descriptor}, Feedback: {item.feedback * 100}%
            </li>
          ))}
        </ul>
        <h2>Historical Number of Matches: {numMatch}</h2>
        <h2>Number of Unmatches: {numUnMatch}</h2>
        <h2>Number of Messages Sent: {numMessSent}</h2>
        <h2>Number of Messages Received: {numMessGot}</h2>
        <h2>Top Messaged Users</h2>
      <ul>
        {Object.entries(topMessaged).map(([userId, userInfo]) => (
          <li key={userId}>
            You've messaged {userInfo.name} {userInfo.message_count} times.
          </li>
        ))}
      </ul>
      <h2>Your Biggest Fans: Users who have Messaged You the Most</h2>
      <ul>
        {Object.entries(topMessGot).map(([userId, userInfo]) => (
          <li key={userId}>
            {userInfo.name} has messaged you {userInfo.message_count} times.
          </li>
        ))}
      </ul>
      </main>
    </div>
  );
}
