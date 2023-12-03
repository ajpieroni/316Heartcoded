import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../components/contexts/UserContext";
// import bcrypt from 'bcryptjs';



export default function Wrapped() {
  const [question, setQuestion] = useState("UNINIT");
  const [testUser, setTestUser] = useState("UNINIT");
  const [error, setError] = useState(null);
  const {user, setUser} = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState(false);


  useEffect(() => {
    // Check if there's user data in sessionStorage on component initialization
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLogin(true);
    }
  }, []);


  return (
    <main className="main-container">
     
    </main>
  );
}

