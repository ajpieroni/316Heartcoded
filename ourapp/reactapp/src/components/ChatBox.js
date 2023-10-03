import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../components/contexts/UserContext";
import "./ChatBox.css";
import { useRef } from "react";

// import "./UserLanding.css";
// import axios from "axios"; // Not currently in use

export default function ChatBox() {
  const [data, setData] = useState(); // This may be used later for fetching chat messages
  const [messages, setMessages] = useState([]); // Local state to hold the chat messages
  const [newMessage, setNewMessage] = useState(""); // Local state to hold the value of the new message
  const { user, setUser } = useContext(UserContext);

  const inputRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent default behavior like new line insertion
      sendMessage();
    }
  };

  useEffect(() => {
    // Check if there's user data in sessionStorage on component initialization
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Function to handle sending the message
  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { user: user.name, content: newMessage }]);
      setNewMessage("");
    }
  };

  return (
    <main className="main-container">
      {/* <h1>Chat</h1> */}
      {/* <h1>Welcome, {user?.name}</h1> */}
      <div className="chat-box">
        {messages.map((message, index) => (
          <p key={index}>
            <strong>{message.user}: </strong>
            {message.content}
          </p>
        ))}
      </div>
      <div className="input-container">
        <input
        ref = {inputRef}
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </main>
  );
}
