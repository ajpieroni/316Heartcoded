import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../components/contexts/UserContext";
import ChatIcon from "@mui/icons-material/Chat";
import InsightsIcon from '@mui/icons-material/Insights';
import "./FindMatch.css";
import Header from "../components/Header";
import { useHistory } from "react-router-dom";
export default function FindMatch() {
  const navigate = useNavigate();

  // const history  = useHistory();
  const [myMatches, setMyMatches] = useState([]);
  const [reciever, setReciever] = useState();
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);
  const [ellipsisDots, setEllipsisDots] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      setEllipsisDots((dots) => (dots < 3 ? dots + 1 : 1));
    }, 200);

    return () => clearInterval(interval);
  }, []);
  const currentUser = user?.id;
  const [currentName, setCurrentName] = useState("");
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  const newMatches = async () => {
    if (!currentUser) return;

    try {
      const response = await fetch(
        `http://localhost:3000/match/${currentUser}`
      );
      const matches = await response.json();
      setMyMatches((prevMatches) => [...prevMatches, ...matches]);
    } catch (error) {
      console.error("Error fetching new matches:", error);
    }
  };

  const unmatch = async (otherUser) => {
    const currentUid = user?.id;
    const otherUid = matchUser?.id;

    if (!currentUid || !otherUid) {
      console.error(
        "Either currentUid or otherUid is missing " + user?.id + " " + otherUid
      );
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/unmatch/${currentUid}/${otherUid}`
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Successfully unmatched:", data);
        setMyMatches((prevMatches) =>
          prevMatches.filter((match) => match.id !== otherUid)
        );
      } else {
        console.error("Failed to unmatch:", data);
      }
    } catch (error) {
      console.error("Error making the fetch call:", error);
    }
  };

  const fetchUserNameById = (id) => {
    return fetch(`http://localhost:3000/test_users/${id}`)
      .then((response) => response.json())
      .then((data) => data.name)
      .catch((error) => console.error("Error fetching user:", error));
  };

  const fetchUserById = (id) => {
    return fetch(`http://localhost:3000/test_users/${id}`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.error("Error fetching user:", error));
  };

  useEffect(() => {
    fetch(`http://localhost:3000/matched_withs/users/${currentUser}`)
      .then((response) => response.json())
      .then(async (matches) => {
        const myName = await fetchUserNameById(user?.id);
        setCurrentName(myName);
        const matchesArray = [];
        for (let match of matches) {
          const otherUserId =
            match.uid1 === user?.id ? match.uid2 : match.uid1;
          const currMatch = await fetchUserById(otherUserId);
          matchesArray.push(currMatch);
        }
        setMyMatches(matchesArray);
      })
      .catch((error) => console.error("Error fetching matches:", error))
      .finally(() => setLoading(false));
  }, [currentUser]);

  function openConversations(matchUser) {
    console.log(`clicked conversations with ${matchUser?.name}`);
    setReciever(matchUser);
    console.log("reciever in match", reciever);

    navigate("/Chat", { state: { reciever: matchUser } });
  }
  function openFeedback(matchUser) {
    console.log(`clicked feedback with ${matchUser?.name}`);
    setReciever(matchUser);
    console.log("reciever in feedback", reciever);

    navigate("/Feedback", { state: { receiver: matchUser } });
  }

  function calculateAge(birthDateString) {
    const today = new Date();
    const birthDate = new Date(birthDateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  return (
    <main className="main-container">
      <Header />
      {loading ? (
        <div className="loading">Loading{".".repeat(ellipsisDots)}</div>
      ) : (
        <>
          <div class="welcome-message">
            {" "}
            {user?.name.split(" ")[0]}'s Current Matches
          </div>
          {/* <h1>{user?.name.split(" ")[0]}'s Current Matches</h1> */}
          <button onClick={newMatches}>New matches!</button>
          <div class="card-container">
            {myMatches.length === 0 ?(<p>You have no matches, get some!</p>):(<>{myMatches.map((matchUser) => (
              <div key={matchUser.id} className="user-card">
                <h2>{matchUser.name}</h2>
                <p>Age: {calculateAge(matchUser.birthday)}</p>
                <p>Bio: {matchUser.bio}</p>
                <div className="chat-section">
                  <ChatIcon onClick={() => openConversations(matchUser)} />
                  <span
                    className="chat-text"
                    onClick={() => openConversations(matchUser)}
                  >
                    Chat with {matchUser.name}
                  </span>
                </div>

                <div className="feedback-section">
                <InsightsIcon onClick={() => openFeedback(matchUser)}/>
                <span
                    className="feedback-text"
                    onClick={() => openFeedback(matchUser)}
                  >
                    Feedback with {matchUser.name}
                  </span>
                  
                </div>
                
                <button
                  class="unmatch-button"
                  onClick={() => unmatch(matchUser)}
                >
                  Unmatch
                </button>
              </div>
            ))}</>)}
            
          </div>
        </>
      )}
    </main>
  );
}
