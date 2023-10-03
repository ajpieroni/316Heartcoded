import React, { useState, useEffect } from "react";
// import "./UserLanding.css";
import axios from "axios";

export default function FindMatch() {
  const [data, setData] = useState();

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

  return (
    <main className="main-container">
        <h1>FindMatch</h1>
 
    </main>
  );
}
