import React, { useState, useEffect, useContext } from "react";
import "./UserLogin.css";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useHistory } from "react-router-dom";
// const history = useHistory();
import { Link } from "react-router-dom";
import { UserContext } from "../components/contexts/UserContext";

import ForgotPassword from "./ForgotPassword";
import CreateProfile from "./CreateProfile.js";
import MatchList from "../components/MatchList";
import Header from "../components/Header";
import Chat from "./Chat";
import "./Conversations.css";
import ChatConversation from "../components/ChatConversation";

export default function Conversations() {
  const [selectedUser, setSelectedUser] = useState(null);
  // const [question, setQuestion] = useState("UNINIT");
  const [testUser, setTestUser] = useState("UNINIT");

  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  console.log("UserContext:", UserContext);
  console.log("User from context:", user);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLogin(true);
    }
  }, [setUser]);

  // const history = useHistory();
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      {/* <h1>{user?.name}'s Conversations 🕺</h1> */}
      <div class="welcome-message">
        {" "}
        {user?.name.split(" ")[0]}'s Conversations
      </div>
      <MatchList
        onUserSelected={(user) => {
          console.log("Selected User:", user);
          setSelectedUser(user);
        }}
      />
      {selectedUser && <ChatConversation selectedUser={selectedUser} />}

      {/* <Chat /> */}
    </div>
  );
}
