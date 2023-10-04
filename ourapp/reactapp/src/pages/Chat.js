import React, { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import { UserContext } from "../components/contexts/UserContext";
import axios from "axios";
import './Chat.css'

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [newMessage, setNewMessage] = useState("");

  const fetchMessages = () => {
    fetch(`http://localhost:3000/test_users/${user?.id}/messages`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched messages:", data);
        setMessages(data);
      })
      .catch((error) => {
        console.error("Error fetching the messages:", error);
      });
  };

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    fetchMessages();
  }, []);

  const handleSend = () => {
    // logic to send a new message, then fetch messages again or update the state directly
    setNewMessage("");
  };

  return (
    <main className="main-container">
      <h1>Chat</h1>
      <h2>
        Welcome, {user?.name} {user?.id}
      </h2>
      <div className="chat-container">
        <MessageList messages={messages} currentUser={user} />
        <div className="message-input-container">
          <input 
            type="text" 
            value={newMessage} 
            onChange={(e) => setNewMessage(e.target.value)} 
            placeholder="Type a message..."
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </main>
  );
}

function MessageList({ messages, currentUser }) {
  return (
    <div className="message-list">
      {messages.map((msg) => {
        const isSender = msg.uid_sender_id === currentUser.id;
        return (
          <div key={msg.id} className={`message ${isSender ? 'sent' : 'received'}`}>
            <p>{msg.message}</p>
            <span className="timestamp">{new Date(msg.timestamp).toLocaleString()}</span>
          </div>
        );
      })}
    </div>
  );
}
