import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../components/contexts/UserContext";
// import bcrypt from 'bcryptjs';
import Header from "../components/Header";
import "./Wrapped.css";
import { useInView } from "react-intersection-observer";
import lofiMusic from "../components/wrapped.mp3";

export default function Wrapped() {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref4, inView4] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref5, inView5] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref6, inView6] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref7, inView7] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref8, inView8] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref9, inView9] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref10, inView10] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref11, inView11] = useInView({ triggerOnce: true, threshold: 0.1 });

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

  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlayPause = () => {
    const audioElement = document.getElementById("backgroundMusic");
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  const fetchQuestions = () => {
    setLoading(true);

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
    setLoading(true);

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
    setLoading(true);

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
    setLoading(true);

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
    setLoading(true);

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
    setLoading(true);

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
    setLoading(true);

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
    setLoading(true);

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
    setLoading(true);

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
    setLoading(true);

    axios
      .get(
        `http://localhost:3000/messages/top_three_messaged_users/${user?.id}`
      )
      .then((response) => {
        setTopMessaged(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the messages:", error);
      });
  };

  const fetchTopMessGot = () => {
    setLoading(true);

    axios
      .get(`http://localhost:3000/messages/top_three_mess_users/${user?.id}`)
      .then((response) => {
        setTopMessGot(response.data);
        setLoading(false);
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
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="audiocontroller">
              <button onClick={togglePlayPause}>
                {isPlaying ? "Pause Music" : "Play Music"}
              </button>
              <div className="audio">
                <audio
                  id="backgroundMusic"
                  controls
                  autoPlay
                  volume={0.5}
                  className={isPlaying ? "" : "hidden-audio"}
                >
                  <source src={lofiMusic} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
            <h1 className="slide-in welcome-wrap-message">
              {user?.name.split(" ")[0]}'s Wrapped
            </h1>
            <p className="subtitle">A Year in Review: Unwrap Your Activity!</p>

            <div
              ref={ref1}
              className={`section font ${inView1 ? "visible" : "hidden"}`}
            >
              <h2 className="scale-up">
                Questions Answered: {questionsAnswered}
              </h2>
              <p className="subtitle">Every Answer Counts!</p>
            </div>

            <div
              ref={ref2}
              className={`section font ${inView2 ? "visible" : "hidden"}`}
            >
              <h2>Most Valued Categories:</h2>
              <p className="subtitle">
                Your Top Picks! These are the categories that you value most.
              </p>
              <ul>
                {mostValuedCategory.map((descriptor, index) => (
                  <li key={index} className="pulse">
                    {descriptor}
                  </li>
                ))}
              </ul>
            </div>

            <div
              ref={ref3}
              className={`section font ${inView3 ? "visible" : "hidden"}`}
            >
              <h2>Least Valued Categories:</h2>
              <p className="subtitle">
                Areas to Explore! These are the categories you value least.
              </p>
              <ul>
                {leastValuedCategory.map((descriptor, index) => (
                  <li key={index} className="pulse">
                    {descriptor}
                  </li>
                ))}
              </ul>
            </div>

            <div
              ref={ref4}
              className={`section font ${inView4 ? "visible" : "hidden"}`}
            >
              <h2>Most Valued Feedback:</h2>
              <p className="subtitle">
                Your Impact Highlighted: These are the categories users ranked
                you as valuing most.
              </p>
              <ul>
                {mostValuedFeedback.map((item, index) => (
                  <li key={index} className="pulse">
                    Category: {item.descriptor}, Feedback: {item.feedback * 100}
                    %
                  </li>
                ))}
              </ul>
            </div>

            <div
              ref={ref5}
              className={`section font ${inView5 ? "visible" : "hidden"}`}
            >
              <h2>Least Valued Feedback</h2>
              <p className="subtitle">
                Constructive Critique: These are categories that users think you
                don't value as much...
              </p>
              <ul>
                {leastValuedFeedback.map((item, index) => (
                  <li key={index} className="pulse">
                    Category: {item.descriptor}, Feedback: {item.feedback * 100}
                    %
                  </li>
                ))}
              </ul>
            </div>

            <div
              ref={ref6}
              className={`section font ${inView6 ? "visible" : "hidden"}`}
            >
              <h2 className="scale-up">
                Historical Number of Matches: {numMatch}
              </h2>
              <p className="subtitle">Your Social Tapestry!</p>
            </div>

            <div
              ref={ref7}
              className={`section font ${inView7 ? "visible" : "hidden"}`}
            >
              <h2 className="scale-up">Number of Unmatches: {numUnMatch}</h2>
              <p className="subtitle">
                Selective Syncs: Here are the total number of people you have
                unmatched with... stay picky!
              </p>
            </div>

            <div
              ref={ref8}
              className={`section font ${inView8 ? "visible" : "hidden"}`}
            >
              <h2 className="scale-up">
                Number of Messages Sent: {numMessSent}
              </h2>
              <p className="subtitle">
                Words on the Wind: You've sent {numMessSent} messages––Chatty
                Cathy!
              </p>
              <h2 className="scale-up">
                Number of Messages Received: {numMessGot}
              </h2>
              <p className="subtitle">
                Echoes Returned: You're a hot commodity, with {numMessGot}{" "}
                messages received!
              </p>
            </div>
            <div
              ref={ref9}
              className={`section font ${inView9 ? "visible" : "hidden"}`}
            >
              <h2 className="scale-up">Top Messaged Users</h2>
              <ul>
                {Object.entries(topMessaged).map(([userId, userInfo]) => (
                  <li key={userId} className="pulse">
                    You've messaged {userInfo.name} {userInfo.message_count}{" "}
                    times.
                  </li>
                ))}
              </ul>
            </div>

            <div
              ref={ref10}
              className={`section font ${inView10 ? "visible" : "hidden"}`}
            >
              <h2 className="scale-up">Your Biggest Fans: Users who have Messaged You the Most</h2>
              <ul>
                {Object.entries(topMessGot).map(([userId, userInfo]) => (
                  <li key={userId} className="pulse">
                    {userInfo.name} has messaged you {userInfo.message_count}{" "}
                    times.
                  </li>
                ))}
              </ul>
            </div>

            <div
              ref={ref11}
              className={`section font ${inView11 ? "visible" : "hidden"}`}
            >
              <h2
                className="pulse"
                style={{ color: "white", fontSize: "4rem" }}
              >
                Thanks for checking out your Heartcoded Wrapped, {user?.name}.
              </h2>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
