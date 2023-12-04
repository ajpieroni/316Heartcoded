import React, { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import { UserContext } from "../components/contexts/UserContext";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import "./Chat.css";
import Header from "../components/Header";


export default function Chat() {
  const location = useLocation();
  const reciever = location.state.reciever;
  const apiToken = process.env.REACT_APP_API_TOKEN;

  // console.log("reciever test", recievertest)
  
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
  
    return fetch(url, requestOptions)
      .then(response => {
        if (!response.ok) {
          console.log(response)
          throw new Error('Network response was not ok');
        }
        return response.json(); 
      })
      .then(data => {
        console.log('Message sent:', data);
        return data; 
      })
      .catch(error => {
        console.error('Error sending message:', error);
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
    const timestamp = Date.now();
    console.log("here's timestamp", timestamp);
    console.log("here's timestamp locale", timestamp.toLocaleString());


    // if(newMessage.trim () === "" || !user) return;

    const messageContent= {
      uid_sender_id: user.id,
      // !to do: dynamic
      uid_receiver_id: reciever.id,
      message: newMessage.trim(),
      chat_order: 1,
      // timestamp: timestamp,


    };

    const messageToSend = {
      message: messageContent
    };

    console.log("New message:", messageToSend);
    sendMessage(messageToSend)
    .then((sentMessage) => { // 'sentMessage' will receive the data from the 'sendMessage' function's successful promise
      console.log('Sent message:', sentMessage);
      setMessages(prevMessages => [...prevMessages, sentMessage]);
      
      setNewMessage("");
    })
    .catch((error) => {
      console.error("There was an error sending the message:", error);
    });
  };

  return (
    <>
    <Header/>
    <main className="main-container">
      <h1 className="main-title">Chat With {reciever?.name}</h1>
      <div className="chat-page-container">
        <MessageList messages={messages} currentUser={user} users={users} reciever={reciever} />

        <div className="message-input-container">
          <input
            type="text"
            value={newMessage}
            
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSend();
              }
            }}
          />
          
          <button onClick={handleSend}>Send!!</button>
        </div>
      </div>
    </main>
    </>
  );
}

function MessageList({ messages, currentUser, users, reciever }) {
  console.log("here's reciever", reciever);

  return (
    <div className="message-list">
      {messages
        .filter(msg => 
          (msg.uid_sender_id === currentUser.id && msg.uid_receiver_id === reciever.id) || 
          (msg.uid_sender_id === reciever.id && msg.uid_receiver_id === currentUser.id))
        .map((msg) => {
          const isSender = msg.uid_sender_id === currentUser.id;
          const senderName = users[msg.uid_sender_id] || "Unknown";

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



