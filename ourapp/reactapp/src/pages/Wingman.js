import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../components/contexts/UserContext";
import axios from "axios";
import Replicate from "replicate";

// import "./Chat.css";
import "./Wingman.css"

export default function Chat() {
  const apiToken = process.env.REACT_APP_API_TOKEN;
  console.log(apiToken)
  const [messages, setMessages] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [newMessage, setNewMessage] = useState("");
  const botId = 100; 
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  // !API

  const replicate = new Replicate({
    auth: "r8_Oz4iaoKys1l1aBK9XgNIpZXnoXFvbjr0qdiX3",
  });
  
  async function runModel() {
    try {
      const output = await replicate.run(
        "meta/llama-2-70b-chat:02e509c789964a7ea8736978a43525956ef40397be9033abf9fd2badfe68c9e3",
        {
          input: {
            prompt: "Can you write a poem about open source machine learning?"
          }
        }
      );
      console.log(output);
    } catch (error) {
      console.error("Error running the model:", error);
    }
  }
  

  

// !End Llama

  const fetchMessages = () => {
    axios.get(`http://localhost:3000/messages/${user?.id}/${botId}`)
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        console.error("Error fetching the messages:", error);
      });
  };
  const sendMessageToBot = async (text) => {
    try {
      const data = {
        inputs: text,
      };
      console.log('Sending to bot:', data);
  
      const response = await fetch(
        "https://api-inference.huggingface.co/models/meta-llama/Llama-2-70b-chat-hf",
        {
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiToken}` }, // Replace with your actual token
          method: "POST",
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const tempresult = await response.json();
    let fullResponse = tempresult[0].generated_text;

    fullResponse = fullResponse.replace(/"/g, '');
    console.log(fullResponse);
    // const parts = fullResponse.split('\n');
    // const result = parts[1].trim();
    return fullResponse;

} catch (error) {
    console.error('Error sending message to the bot:', error);
}
};

  const handleSend = async () => {
    if(newMessage.trim() === "") return;
    setIsSending(true);

    const userMessage = {
      id: messages.length + 1, // simplistic way to generate a unique ID
      uid_sender_id: user.id,
      message: newMessage.trim(),
      timestamp: Date.now(),
    };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    // wait for response
    const botResponse = await sendMessageToBot("Respond in a conversational style, sarcasticaly, as a dating wingman. Make your response brief: "+newMessage.trim());

    if (botResponse) {
      const botMessage = {
        id: messages.length + 2, // simplistic way to generate a unique ID
        uid_sender_id: "AI_BOT_ID",
        message: botResponse,
        timestamp: Date.now(),
        isBot: true
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);
      setIsSending(false); 
    }

    // Clear the input field
    setNewMessage("");
  };
  useEffect(() => {
    if (user?.id) {
      fetchMessages();
    }
  }, [user]);

  return (
    <main className="main-container">
      <h1>Chat with your Wingman</h1>
      <div className="chat-container">
        <div className="message-list">
          {messages.map((msg, index) => {
            const isSender = msg.uid_sender_id === user.id;
            return (
              <div key={index} className={`message ${isSender ? 'sent' : 'received'}`}>
                <p>{isSender ? `You: ${msg.message}` : `Your Wingman: ${msg.message}`}</p>
                <span className="timestamp">{new Date(msg.timestamp).toLocaleString()}</span>
              </div>
            );
          })}
        </div>
        {isSending && (<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>)}
        <button onClick = {runModel}>RUN MODEL</button>
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
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </main>
  );
}