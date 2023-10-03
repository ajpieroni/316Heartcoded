import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../components/contexts/UserContext";
// import "./UserLanding.css";
import axios from "axios";

export default function Chat() {
  const [data, setData] = useState();
  const { user, setUser } = useContext(UserContext);
  


//   const fetchData = () => {
//     fetch(`http://localhost:3000/questions/1`)
//       .then((response) => response.json())
//       .then((data) => setQuestion(data.question))
//       .catch((error) => {
//         console.error("Error fetching the question:", error);
//       });
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);
  useEffect(() => {
    // Check if there's user data in sessionStorage on component initialization
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      // setLogin(true);
    }
  }, []);
  

  return (
    <main className="main-container">
        <h1>Chat</h1>
        <h1>Welcome, {user?.name}</h1>

 
    </main>
  );
}
