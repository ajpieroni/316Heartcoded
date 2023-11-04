import React, { useState, useEffect } from 'react';
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';

import { UserContext } from "../components/contexts/UserContext";
import ChatIcon from '@mui/icons-material/Chat';
import "./FindMatch.css"
import Header from '../components/Header';
import {useHistory} from 'react-router-dom';
export default function FindMatch() {
  const navigate = useNavigate();

    // const history  = useHistory();
    const [myMatches, setMyMatches] = useState([]);
    const [reciever, setReciever] = useState();
    const { user, setUser } = useContext(UserContext);
    const currentUser = user?.id;
    const [currentName, setCurrentName] = useState("");
    useEffect(() => {
        // When the component mounts, check if the user is stored in sessionStorage
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser)); // Parse the string back to an object and set it in the context
        //   setLogin(true); // If necessary, set the login state
        }
      }, [setUser]); // Dependency array to run the effect when setUser changes, which is likely only on mount
      
    

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

    useEffect(() => {
        fetch(`http://localhost:3000/matched_withs/users/${currentUser}`)
            .then((response) => response.json())
            .then(async (matches) => {
                const myName = await fetchUserNameById(currentUser);
                setCurrentName(myName);
                const matchesArray = [];
                for (let match of matches) {
                    const otherUserId = match.uid1 === currentUser ? match.uid2 : match.uid1;
                    const currMatch = await fetchUserById(otherUserId);
                    matchesArray.push(currMatch);
                }
                setMyMatches(matchesArray);
            })
            .catch((error) => console.error("Error fetching matches:", error));
    }, [currentUser]);

    function openConversations(matchUser){
        console.log(`clicked conversations with ${matchUser?.name}`)
        setReciever(matchUser);
        console.log("reciever in match", reciever);
        
        navigate('/Chat', {state: {reciever: matchUser}});
        
    }

    return (
        <main className="main-container">
        <Header />

        <h1>Hi {user?.name}! Here are your Current Matches</h1>
        <button onClick={newMatches}>New matches!</button>
        <ul>
          {myMatches.map((matchUser) => (
            <div key={matchUser.id} className="user-card">
              <h2>{matchUser.name}</h2>
              <p>Birthday: {matchUser.birthday}</p>
              <p>Bio: {matchUser.bio}</p>
              <div className="chat-section">
                <ChatIcon onClick={() => openConversations(matchUser)}/>
                <span className="chat-text" onClick={() => openConversations(matchUser)}>Chat with {matchUser.name}</span>
              </div>
              <button onClick={() => unmatch(matchUser)}>Unmatch</button>
            </div>
          ))}
        </ul>
      </main>
      
    );
}
