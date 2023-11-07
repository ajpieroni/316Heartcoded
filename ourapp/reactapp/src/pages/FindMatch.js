import React, { useState, useEffect } from 'react';
import { useContext } from "react";
import { UserContext } from "../components/contexts/UserContext";

export default function FindMatch() {
    const [myMatches, setMyMatches] = useState([]);
    const { user, setUser } = useContext(UserContext);
    const currentUser = user?.id;
    const [currentName, setCurrentName] = useState("");

    const newMatches = async () => {
        if (!currentUser) return;

        try {
            const response = await fetch(`http://localhost:3000/match/${currentUser}`);
            const matches = await response.json();
            setMyMatches(prevMatches => [...prevMatches, ...matches]);
        } catch (error) {
            console.error('Error fetching new matches:', error);
        }
    }

    const unmatch = async (otherUser) => {
        const currentUid = user?.id;
        const otherUid = otherUser.id;
    
        if (!currentUid || !otherUid) {
            console.error('Either currentUid or otherUid is missing ' + user?.id + ' ' + otherUid);
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:3000/unmatch/${currentUid}/${otherUid}`);
    
            const data = await response.json();
    
            if (response.ok) {
                console.log('Successfully unmatched:', data);
                setMyMatches(prevMatches => prevMatches.filter(match => match.id !== otherUid));
            } else {
                console.error('Failed to unmatch:', data);
            }
        } catch (error) {
            console.error('Error making the fetch call:', error);
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
    }

    const fetchMatches = async () => {
        try {
          const response = await fetch(`http://localhost:3000/matched_withs/users/${currentUser}`);
          const matches = await response.json();
          const myName = await fetchUserNameById(currentUser);
          setCurrentName(myName);
          const matchesArray = [];
          for (let match of matches) {
            const otherUserId = match.uid1 === currentUser ? match.uid2 : match.uid1;
            const currMatch = await fetchUserById(otherUserId);
            matchesArray.push(currMatch);
          }
        //   setMyMatches(matchesArray);
          console.log(matchesArray);
        } catch (error) {
          console.error("Error fetching matches:", error);
        }
        fetchMatches();
        console.log(myMatches);
      };

      useEffect(() => {
        fetchMatches();
      });

    return (
      <main className="main-container">
        <h1>Hi {currentName}! Here are your current Matches</h1>
        <button onClick={newMatches}>New matches!</button>
        <ul>
          {myMatches.map((user) => (
            <div key={user.id} className="user-card">
              <h2>{user.name}</h2>
              <p>Birthday: {user.birthday}</p>
              <p>Bio: {user.bio}</p>
              <button onClick={() => unmatch(user)}>Unmatch</button>
            </div>
          ))}
        </ul>
      </main>
    );
}
