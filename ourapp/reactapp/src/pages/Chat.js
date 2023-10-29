import React, { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import { UserContext } from "../components/contexts/UserContext";
import axios from "axios";
import "./Chat.css";

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
        return data.name; 
      })
      .catch((error) => console.error("Error fetching user:", error));
  };

  const sendMessage = (messageObject) => {
    const url = `http://localhost:3000/test_users/${user?.id}/messages`;
  
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messageObject) // Convert your message object into a JSON string
    };
  
    // Make sure to return the fetch promise so that you can use .then() when calling sendMessage.
    return fetch(url, requestOptions)
      .then(response => {
        if (!response.ok) {
          console.log(response)
          throw new Error('Network response was not ok');
        }
        return response.json(); // This parses the JSON of the response body
      })
      .then(data => {
        console.log('Message sent:', data);
        return data; // This will be the resolved value of the promise
      })
      .catch(error => {
        console.error('Error sending message:', error);
        // If you want to keep chaining promises after catching an error, 
        // you need to return a rejected promise here:
        return Promise.reject(error);
      });
  };
  
  
  useEffect(() => {
    // fetch unique user IDs from messages
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
    console.log("handleSend triggered");
    // if(newMessage.trim () === "" || !user) return;

    const messageToSend={
      uid_sender_id: user.id,
      message: newMessage.trim(),

    };
    console.log("New message:", messageToSend);
    sendMessage(messageToSend)
    .then((sentMessage) => { // 'sentMessage' will receive the data from the 'sendMessage' function's successful promise
      console.log('Sent message:', sentMessage);
      // Update state with the new message; you should use a function to update the state based on the previous state to avoid issues due to state updates batching
      setMessages(prevMessages => [...prevMessages, sentMessage]);
      
      // Clear the input field
      setNewMessage("");
    })
    .catch((error) => {
      console.error("There was an error sending the message:", error);
    });
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


