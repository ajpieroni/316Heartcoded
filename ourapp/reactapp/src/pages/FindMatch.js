import React, { useState, useEffect } from 'react';

export default function FindMatch() {
    const [matchNames, setMatchNames] = useState([]);
    const currentUser = 2;
    const [currentName, setCurrentName] = useState("");

    const fetchUserNameById = (id) => {
        return fetch(`http://localhost:3000/test_users/${id}`)
            .then((response) => response.json())
            .then((data) => data.name)
            .catch((error) => console.error("Error fetching user:", error));
    };

    useEffect(() => {
        fetch(`http://localhost:3000/matched_withs/users/${currentUser}`)
            .then((response) => response.json())
            .then(async (matches) => {
                const names = [];
                for (let match of matches) {
                    const otherUserId = match.uid1 === currentUser ? match.uid2 : match.uid1;
                    const name = await fetchUserNameById(otherUserId);
                    const myName = await fetchUserNameById(currentUser);
                    setCurrentName(myName);
                    names.push(name);
                }
                setMatchNames(names);
            })
            .catch((error) => console.error("Error fetching matches:", error));
    }, []);

    return (
        <main className="main-container">
            <h1>Hi {currentName}! Here are your current Matches</h1>
            <ul>
                {matchNames.map((name, index) => (
                    <li key={index}>{name}</li>
                ))}
            </ul>
        </main>
    );
}
