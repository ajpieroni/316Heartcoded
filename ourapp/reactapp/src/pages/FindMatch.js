import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../components/contexts/UserContext";
import ChatIcon from "@mui/icons-material/Chat";
import InsightsIcon from "@mui/icons-material/Insights";
import "./FindMatch.css";
import Header from "../components/Header";
import { useHistory } from "react-router-dom";
import ProfileCard from "./ProfileCard";
export default function FindMatch() {
  const navigate = useNavigate(); // const history  = useHistory();

  const [myMatches, setMyMatches] = useState([]);
  const [reciever, setReciever] = useState();
  const [loading, setLoading] = useState(true);
  const [pageloading, setPageLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);
  const [ellipsisDots, setEllipsisDots] = useState(1);
  const [matchesMaxed, setMatchesMaxed] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [matchSet, setMatchSet] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setEllipsisDots((dots) => (dots < 3 ? dots + 1 : 1));
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const currentUser = user?.id;

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [user?.id]);

  const newMatches = async () => {
    setLoading(true);

    if (!currentUser) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/match/${currentUser}`
      );
      const matches = await response.json();

      // Check if matches array is empty
      if (matches.length === 0) {
        setMatchesMaxed(true);
      } else {
        // setMatchesMaxed(false);
      }
    } catch (error) {
      console.error("Error fetching new matches:", error);
    } finally {
      setLoading(false); // Set loading to false when fetch operation completes
      fetchMatches();
    }
  };

  const unmatch = async (otherUser) => {
    if (otherUser?.id === 0) {
      console.log("you can't unmatch with wingman!");
    }
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
        // setPageLoading(false);
      } else {
        console.error("Failed to unmatch:", data);
      }
    } catch (error) {
      console.error("Error making the fetch call:", error);
    }
    fetchMatches();
  };

  const fetchUserById = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/test_users/${id}`);
      const user = await response.json();

      const fetchAvatarUrl = async () => {
        try {
          const avatarResponse = await fetch(
            `http://localhost:3000/test_users/${id}`
          );
          if (avatarResponse.ok) {
            const avatarData = await avatarResponse.json();
            setAvatarUrl(avatarData.avatar_url);
          } else {
            console.error("Error fetching avatar URL");
          }
        } catch (error) {
          console.error("Error fetching avatar URL:", error);
        }
      };

      fetchAvatarUrl();

      console.log("User details:", user);
      return user;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  };

  const showUnmatchConfirmation = (otherUser) => {
    const confirmation = window.confirm(
      `Are you sure you want to unmatch ${otherUser?.name}?`
    );

    if (confirmation) {
      unmatch(otherUser);
    }
  };

  const fetchDefaultMatch = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/test_users/find_by_username/Wingman`
      );
      const users = await response.json();
      console.log("default:", users);
      return users; // Get the first user with username "Wingman"
    } catch (error) {
      console.error("Error fetching default match:", error);
      return null;
    }
  };

  const fetchMatches = async () => {
    const defaultMatch = await fetchDefaultMatch();
    console.log("default", defaultMatch);
    fetch(`http://localhost:3000/matched_withs/users/${currentUser}`)
      .then((response) => response.json())
      .then(async (matches) => {
        const matchesArray = [];
        // if (defaultMatch) {
        //   matchesArray.push(defaultMatch);
        // }
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

  };

  useEffect(() => {
    fetchMatches();
  }, [user?.id]);

  function openConversations(matchUser) {
    console.log(`clicked conversations with ${matchUser?.name}`);
    setReciever(matchUser);
    console.log("reciever in match", reciever);
    if (matchUser.username === "Wingman") {
      navigate("/Wingman");
    } else {
      navigate("/Chat", { state: { reciever: matchUser } });
    }
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

  const openDetailsDialog = async (matchUser) => {
    try {
      const detailedUser = await fetchUserById(matchUser.id);
      if (detailedUser) {
        setReciever(detailedUser);
        setShowDetailsDialog(true);
      } else {
        console.error("User details not available.");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const closeDetailsDialog = () => {
    setShowDetailsDialog(false);
    setAvatarUrl(null);
  };

  // Functions for rending user details
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }
  function getPronoun(gender) {
    switch (gender) {
      case "M":
        return "his";
      case "F":
        return "her";
      case "X":
        return "their";
      default:
        return "their";
    }
  }

  return (
    <div>
      <Header />
      <main className="main-container">
        <h1 className="main-title">Your Matches</h1>
        {loading && (
          <div className="loading-container">
            <div className="loading-text">
              Loading{".".repeat(ellipsisDots)}
            </div>
          </div>
        )}

        {!loading && !matchesMaxed && myMatches.length < 11 && (
          <button onClick={newMatches}>New matches!</button>
        )}

        {showDetailsDialog && (
          <ProfileCard user = {reciever} onClose={closeDetailsDialog} />
        )}

        {matchesMaxed && (
          <div className="loading-container">
            <div className="loading-text">
              No more new matches available! You're picky!
            </div>
          </div>
        )}

        <div className="card-container">
          {loading ? (
            <p></p>
          ) : (
            <>
              {myMatches.map((matchUser) => (
                <div key={matchUser.id} className="user-card">
                  <h2>{matchUser.name}</h2>

                  <p style={{ fontStyle: "italic" }}>@{matchUser.username}</p>

                  <div className="chat-section">
                    <ChatIcon onClick={() => openConversations(matchUser)} />
                    <span
                      className="chat-text"
                      onClick={() => openConversations(matchUser)}
                    >
                      Chat with {matchUser?.name.split(" ")[0]}
                    </span>
                  </div>

                  {matchUser && matchUser.id !== 1 ? (
                    <>
                      <div className="feedback-section">
                        <InsightsIcon onClick={() => openFeedback(matchUser)} />
                        <span
                          className="feedback-text"
                          onClick={() => openFeedback(matchUser)}
                        >
                          Give Feedback to {matchUser.name.split(" ")[0]}
                        </span>
                      </div>
                      <div className="unmatch">
                        <button
                          className="unmatch-button"
                          onClick={() => openDetailsDialog(matchUser)}
                        >
                          View User Info
                        </button>
                      </div>
                      <div className="unmatch">
                        <button
                          className="unmatch-button"
                          onClick={() => showUnmatchConfirmation(matchUser)}
                        >
                          Unmatch
                        </button>
                      </div>
                    </>
                  ) : null}
                </div>
              ))}
            </>
          )}
          {myMatches.length === 0 && !loading && matchSet ? (
            <p>You have no matches, get some!</p>
          ) : null}
        </div>
      </main>
    </div>
  );
}
