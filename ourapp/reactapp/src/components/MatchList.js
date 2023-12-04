import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../components/contexts/UserContext";
import ChatIcon from "@mui/icons-material/Chat";
// import "./FindMatch.css";
import Header from "../components/Header";
import { useHistory } from "react-router-dom";
import "./MatchList.css";
export default function MatchList({onUserSelected}) {
  const navigate = useNavigate();

  // const history  = useHistory();
  const [myMatches, setMyMatches] = useState([]);
  const [reciever, setReciever] = useState();
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);
  const [selectedMatch, setSelectedMatch] = useState(null);
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
    // When the component mounts, check if the user is stored in sessionStorage
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      //   setLogin(true); // If necessary, set the login state
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
    const otherUid = otherUser.id;

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
  const selectUserForChat = (user) => {
    setSelectedMatch(user);
    if (onUserSelected) {
      onUserSelected(user); 
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
        const myName = await fetchUserNameById(currentUser);
        setCurrentName(myName);
        const matchesArray = [];
        for (let match of matches) {
          const otherUserId =
            match.uid1 === currentUser ? match.uid2 : match.uid1;
          const currMatch = await fetchUserById(otherUserId);
          matchesArray.push(currMatch);
        }
        setMyMatches(matchesArray);
      })
      .catch((error) => console.error("Error fetching matches:", error))
      .finally(() => setLoading(false));
  }, [currentUser]);

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
    <>
      {loading ? (
        <div className="loading">Loading{".".repeat(ellipsisDots)}</div>
      ) : (
        <>
          <div className="matches-and-chat-container">
         
            {/* Left Side Panel */}
            <div className="left-panel">
            <h3 className="centered-heading">Matches</h3>
              <ul className="matches-list">
                {myMatches.map((matchUser) => (
                  <li
                    key={matchUser.id}
                    onClick={() => selectUserForChat(matchUser)}
                  >
                    {matchUser.name}
                  </li>
                ))}
              </ul>
            </div>

           
          </div>
        </>
      )}
    </>
  );
}
