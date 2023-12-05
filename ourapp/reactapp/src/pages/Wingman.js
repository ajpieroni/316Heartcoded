import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../components/contexts/UserContext";
import axios from "axios";
// import Replicate from "replicate";

// import "./Chat.css";
import "./Wingman.css";
import Header from "../components/Header";

export default function Chat() {
  const apiToken = process.env.REACT_APP_API_TOKEN;
  const [messages, setMessages] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [newMessage, setNewMessage] = useState("");
  const botId = 1;
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const fetchMessages = () => {
    axios
      .get(`http://localhost:3000/messages_between/${user?.id}/${botId}`)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the messages:", error);
      });
  };

  const sendMessage = (messageObject) => {
    console.log(`sending messageObject ${messageObject.message}`)
    const url = `http://localhost:3000/test_users/${user?.id}/messages`;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(messageObject), // Convert your message object into a JSON string
    };

    return fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Message sent:", data);
        return data;
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        return Promise.reject(error);
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
        console.log("set to reply[1]");
        botreply = reply[1].replace(/"/g, "");
      } else {
        const partToRemove =
          /Respond with a reply, sarcastically, as a dating wingman\. Make your response brief: /;
        const newMessage = fullResponse.replace(partToRemove, "").trim();
        const finalMessage = newMessage.replace(messagetobecut, "").trim();
        console.log("set to regex");
        botreply = finalMessage.replace(/"/g, "");
        console.log(botreply);
      }

      return botreply;
    } catch (error) {
      console.error("Error sending message to the bot:", error);
    }
  };

  const handleBotSend = async (text) => {
    const botMessage = {
      id: messages.length + 1, // simplistic way to generate a unique ID
      uid_sender_id: botId,
      uid_receiver_id: user.id,
      message: text.trim(),
      timestamp: Date.now(),
    };
    const messageToSend = {
      message: botMessage,
    };
    console.log("sending message", messageToSend.message)
    console.log("sending message, sender id", messageToSend.message.uid_sender_id)
    console.log("sending message, reciever id", messageToSend.message.uid_receiver_id)

console.log("called send message", messageToSend)
    sendBotMessage(messageToSend);
  };
  const sendBotMessage = (messageObject) => {
    console.log(`sending messageObject ${messageObject.message}`)
    const url = `http://localhost:3000/test_users/${botId}/messages`;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(messageObject), // Convert your message object into a JSON string
    };

    return fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Message sent:", data);
        return data;
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        return Promise.reject(error);
      });
  };

  const handleSend = async () => {
    setNewMessage("");
    if (newMessage.trim() === "") return;
    setIsSending(true);

    const userMessage = {
      id: messages.length + 1, // simplistic way to generate a unique ID
      uid_sender_id: user.id,
      uid_receiver_id: botId,
      message: newMessage.trim(),
      timestamp: Date.now(),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const messageToSend = {
      message: userMessage,
    };
    sendMessage(messageToSend);

    console.log("here is user message to send", userMessage);
    // post user response to db
    // wait for response
    const botResponse = await sendMessageToBot(
      "Respond with a reply, sarcastically, as a dating wingman. Make your response brief: " +
        newMessage.trim()
    );

    if (botResponse) {
      const botMessage = {
        id: messages.length + 2, // simplistic way to generate a unique ID
        uid_sender_id: botId,
        uid_receiver_id: user.id,
        message: botResponse,
        timestamp: Date.now(),
        isBot: true,
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
      console.log("here is message to be sent", botMessage)
      console.log("called handle bot send")
      handleBotSend(botResponse)
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
      <Header />
      <main className="main-container">
        <h1 className="main-title">Chat With Your Wingman</h1>
        <div className="chat-wingman-container">
          <div className="message-wingman-list">
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