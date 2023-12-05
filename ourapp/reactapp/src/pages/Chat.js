import React, { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import { UserContext } from "../components/contexts/UserContext";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./Chat.css";
import Header from "../components/Header";

export default function Chat() {
  const location = useLocation();
  const reciever = location.state.reciever;
  const apiToken = process.env.REACT_APP_API_TOKEN;
  const [convStarters, setConvStarters] = useState({});
  const [date, setDate] = useState({});
  const [convLoading, setConvLoading] = useState(false);
  // const conversationKey = `${currentUser.id}-${reciever.id}`;
  // console.log("reciever test", recievertest)

  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const prompts = [
    "Generate a short icebreaker question about travel for two single people. Don't explain your answer, only respond with the question.",
    "Generate a short icebreaker question about food for two single people. Don't explain your answer, only respond with the question.",
    "Generate a short icebreaker question about movies for two single people. Don't explain your answer, only respond with the question.",
    "Generate a short icebreaker question about hobbies for two single people. Don't explain your answer, only respond with the question.",
    "Generate a short icebreaker question about spirituality for two single people. Don't explain your answer, only respond with the question.",
    "Generate a short icebreaker question about environmental consciousness for two single people. Don't explain your answer, only respond with the question.",
    "Generate a short icebreaker question about family for two single people. Don't explain your answer, only respond with the question.",
    "Generate a short icebreaker question about career interests for two single people. Don't explain your answer, only respond with the question.",
    "Generate a short icebreaker question about adventure for two single people. Don't explain your answer, only respond with the question.",
    "Generate a short icebreaker question about trustfulness for two single people. Don't explain your answer, only respond with the question.",
    "Generate a short icebreaker question about frugality for two single people. Don't explain your answer, only respond with the question.",
    "Generate a short icebreaker question about sentimentality for two single people. Don't explain your answer, only respond with the question.",
    "Generate a short icebreaker question about creativity for two single people. Don't explain your answer, only respond with the question.",
    "Generate a short icebreaker question about traditionalism for two single people. Don't explain your answer, only respond with the question.",
    "Generate a short icebreaker question about assertiveness for two single people. Don't explain your answer, only respond with the question.",
  ];

  const getNextPrompt = () => {
    const nextPrompt = prompts[currentPromptIndex];
    setCurrentPromptIndex((currentPromptIndex + 1) % prompts.length);
    return nextPrompt;
  };
  const [messages, setMessages] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [newMessage, setNewMessage] = useState("");
  const [users, setUsers] = useState({});

  let conversationKey;
  if (user && reciever) {
    conversationKey = `${user.id}-${reciever.id}`;
  }
  const sendMessageToBot = async (text) => {
    try {
      setConvLoading(true);
      let data;

      if (!date[conversationKey]) {
        const prompt = getNextPrompt();
        data = { inputs: prompt };
        console.log("Sending to bot:", data);
      } else {
        data = { inputs: text };
      }
      console.log("here is data", data);

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
      console.log("response ok");

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
        const partToRemove = "Example:";
        const newMessage = fullResponse.replace(partToRemove, "").trim();
        const finalMessage = newMessage.replace(messagetobecut, "").trim();
        console.log("set to regex");
        botreply = finalMessage.replace(/"/g, "");
        console.log(botreply);
        // const conversationKey = `${user.id}-${reciever.id}`;
        setConvStarters((prevStarters) => ({
          ...prevStarters,
          [conversationKey]: botreply,
        }));
        // setConvStarters(botreply);
        console.log("conv starter", convStarters);
        setConvLoading(false);
      }
      // const conversationKey = `${user.id}-${reciever.id}`;
      setConvStarters((prevStarters) => ({
        ...prevStarters,
        [conversationKey]: botreply,
      }));
      setConvLoading(false);
      return botreply;
    } catch (error) {
      console.error("Error sending message to the bot:", error);
      setConvLoading(false);
    }
  };
  useEffect(() => {
    const filteredMessages = messages.filter(
      (msg) =>
        (msg.uid_sender_id === user?.id &&
          msg.uid_receiver_id === reciever?.id) ||
        (msg.uid_sender_id === reciever?.id && msg.uid_receiver_id === user?.id)
    );

    if (filteredMessages.length === 10 || filteredMessages.length > 10) {
      queueDate();
    }
  }, [messages, user?.id, reciever?.id]);
  function queueDate() {
    // Define what you want to do when there are 10 messages
    console.log("There are 10 messages between the two users.");
    console.log("called function");
    setDate((prevDate) => ({
      ...prevDate,
      [conversationKey]: true,
    }));

    sendMessageToBot(
      "Tell two users who have sent more than 10 messagaes on a dating app to go on a date with a only one simple sentence. Be cheeky and sarcastic. Do not include any variations."
    );
  }
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
    const trimmedMessage = newMessage.trim();
    if(!trimmedMessage){
      return;
    }
    const timestamp = Date.now();
    console.log("here's timestamp", timestamp);
    console.log("here's timestamp locale", timestamp.toLocaleString());

    // if(newMessage.trim () === "" || !user) return;

    const messageContent = {
      uid_sender_id: user.id,
      // !to do: dynamic
      uid_receiver_id: reciever.id,
      message: newMessage.trim(),
      chat_order: 1,
      // timestamp: timestamp,
    };

    const messageToSend = {
      message: messageContent,
    };

    console.log("New message:", messageToSend);
    sendMessage(messageToSend)
      .then((sentMessage) => {
        // 'sentMessage' will receive the data from the 'sendMessage' function's successful promise
        console.log("Sent message:", sentMessage);
        setMessages((prevMessages) => [...prevMessages, sentMessage]);

        setNewMessage("");
      })
      .catch((error) => {
        console.error("There was an error sending the message:", error);
      });
  };

  return (
    <>
      <Header />
      <main className="main-container">
        <h1 className="main-title">Chat With {reciever?.name}</h1>
        <div className="chat-page-container">
          <MessageList
            messages={messages}
            currentUser={user}
            users={users}
            reciever={reciever}
            convStarters={convStarters}
          />

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
            <button
              onClick={sendMessageToBot}
              disabled={convLoading}
              style={{
                backgroundColor: !convLoading ? "grey" : "",
                color: !convLoading ? "white" : "",
              }}
            >
              Get Conversation Starter
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

function MessageList({ messages, currentUser, users, reciever, convStarters }) {
  console.log("here's reciever", reciever);
  const conversationKey = `${currentUser?.id}-${reciever?.id}`;
  return (
    <div className="message-list">
      {messages
        .filter(
          (msg) =>
            (msg.uid_sender_id === currentUser.id &&
              msg.uid_receiver_id === reciever.id) ||
            (msg.uid_sender_id === reciever.id &&
              msg.uid_receiver_id === currentUser.id)
        )
        .map((msg) => {
          const isSender = msg.uid_sender_id === currentUser.id;
          const senderName = users[msg.uid_sender_id] || "Unknown";

          return (
            <div
              key={msg.id}
              className={`message ${isSender ? "sent" : "received"}`}
            >
              <p>
                {isSender
                  ? `You: ${msg.message}`
                  : `${senderName}: ${msg.message}`}
              </p>
              <span className="timestamp">
                {new Date(msg.timestamp).toLocaleString()}
              </span>
            </div>
          );
        })}
      {convStarters[conversationKey] && (
        <div className="bot-reply">
          <p>Wingman: {convStarters[conversationKey]}</p>
        </div>
      )}
    </div>
  );
}
