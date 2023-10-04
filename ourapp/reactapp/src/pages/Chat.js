import React, { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import { UserContext } from "../components/contexts/UserContext";
import axios from "axios";
// import "./Chat.css";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [newMessage, setNewMessage] = useState("");
  const [users, setUsers] = useState({});

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

  const fetchUserNameById = (id) => {
    return fetch(`http://localhost:3000/test_users/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(`name ${data.name}`);
      })
      .catch((error) => console.error("Error fetching user:", error));
  };

  useEffect(() => {
    // Fetch unique user IDs from messages
    const userIds = [
      ...new Set(
        messages
          .map((msg) => msg.uid_sender_id)
          .concat(messages.map((msg) => msg.uid_receiver_id))
      ),
    ];

    // for each id in set fetch the name
    Promise.all(userIds.map((id) => fetchUserNameById(id)))
      // then ret is names
      .then((names) => {
        // keys are user ids, values are names
        const usersObj = userIds.reduce((acc, id, index) => {
          // for each userid set name
          acc[id] = names[index];
          //  ret accumulator
          return acc;
        }, {});
        setUsers(usersObj);
      });
    //  dependent on new messages
  }, [messages]);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user && user.id) {
      fetchMessages();
    }
  }, [user]);

  const handleSend = () => {
    // logic to send a new message, then fetch messages again or update the state directly
    setNewMessage("");
  };

  return (
    <main className="main-container">
      <h1>Chat</h1>
      <h2>Welcome, {user?.name}</h2>
      <div className="chat-container">
        <MessageList messages={messages} currentUser={user} users={users} />

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

function MessageList({ messages, currentUser, users }) {
  console.log('Received messages:', messages); 
  console.log('Current User:', currentUser);    
  console.log('Users:', users);                 

  return (
    <div className="message-list">
      {messages.map((msg) => {
        console.log('Current Message:', msg);   // message currently being processed

        const isSender = msg.uid_sender_id === currentUser.id;
        console.log('Is current user the sender?', isSender); // current user is the sender or not

        const senderName = users[msg.uid_sender_id] || "Unknown";
        console.log('Sender Name:', senderName);  // sender's name

        const receiverName = users[msg.uid_receiver_id] || "Unknown";
        console.log('Receiver Name:', receiverName); // receiver's name

        return (
          <div key={msg.id} className={`message ${isSender ? 'sent' : 'received'}`}>
            <p>
              {isSender ? 
               `You: ${msg.message}` : 
               `${senderName}: ${msg.message}`}
            </p>
            <span className="timestamp">{new Date(msg.timestamp).toLocaleString()}</span>
          </div>
        );
      })}
    </div>
  );
}


