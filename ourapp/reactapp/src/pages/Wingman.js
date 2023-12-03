import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../components/contexts/UserContext";
import axios from "axios";
import Replicate from "replicate";

// import "./Chat.css";
import "./Wingman.css";
import Header from "../components/Header";

export default function Chat() {
  const apiToken = process.env.REACT_APP_API_TOKEN;
  // console.log(apiToken)
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

  const fetchMessages = () => {
    axios
      .get(`http://localhost:3000/messages/${user?.id}/${botId}`)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the messages:", error);
      });
  };
  const sendMessageToBot = async (text) => {
    try {
      const data = {
        inputs: text,
      };
      console.log("Sending to bot:", data);

      const response = await fetch(
        "https://api-inference.huggingface.co/models/meta-llama/Llama-2-70b-chat-hf",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiToken}`,
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const tempresult = await response.json();
      let fullResponse = tempresult[0].generated_text;
      console.log(fullResponse);
      const responseRegex = /\n([\s\S]*)/;
      const reply = fullResponse.match(responseRegex);
      let botreply = "";
      let messagetobecut = newMessage.trim();

      if (reply) {
        console.log(reply[1]);
        console.log("set to reply[1]"
        )
        botreply = reply[1].replace(/"/g, '');
        
        
      } else {
        const partToRemove = /Respond with a reply, sarcastically, as a dating wingman\. Make your response brief: /;
        const newMessage = fullResponse.replace(partToRemove, "").trim();
        const finalMessage = newMessage.replace(messagetobecut, "").trim();
        console.log("set to regex" )
        botreply = finalMessage.replace(/"/g, '');
        console.log(botreply)
      }

      return botreply;
    } catch (error) {
      console.error("Error sending message to the bot:", error);
    }
  };

  const handleSend = async () => {
    setNewMessage("")
    if (newMessage.trim() === "") return;
    setIsSending(true);
    


    const userMessage = {
      id: messages.length + 1, // simplistic way to generate a unique ID
      uid_sender_id: user.id,
      message: newMessage.trim(),
      timestamp: Date.now(),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // wait for response
    const botResponse = await sendMessageToBot(
      "Respond with a reply, sarcastically, as a dating wingman. Make your response brief: " +
        newMessage.trim()
    );

    if (botResponse) {
      const botMessage = {
        id: messages.length + 2, // simplistic way to generate a unique ID
        uid_sender_id: "AI_BOT_ID",
        message: botResponse,
        timestamp: Date.now(),
        isBot: true,
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setIsSending(false);
    }
    // Clear the input field
  };
  useEffect(() => {
    if (user?.id) {
      fetchMessages();
    }
  }, [user]);

  return (
    <>
    <Header/>
    <main className="main-container">
      <h1>Chat with your Wingman</h1>
      <div className="chat-container">
        <div className="message-list">
          {messages.map((msg, index) => {
            const isSender = msg.uid_sender_id === user.id;
            return (
              <div
                key={index}
                className={`message ${isSender ? "sent" : "received"}`}
              >
                <p>
                  {isSender
                    ? `You: ${msg.message}`
                    : `Your Wingman: ${msg.message}`}
                </p>
                <span className="timestamp">
                  {new Date(msg.timestamp).toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>
        {isSending && (
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
        <div className="message-input-container">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </main>
    </>
  );
}
