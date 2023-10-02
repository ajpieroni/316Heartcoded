import React, { useEffect, useState } from "react";
import axios from "axios";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [isApiCallComplete, setIsApiCallComplete] = useState(false);
  // Get userId
  const [userId, setUserId] = useState("");
  // Get uniqueId
  const [uniqueId, setUniqueId] = useState("");
  // !TODO: Make sure that display name is imported from shib correctly.
  // Get display_name
  const [displayName, setDisplayName] = useState(null);
  // Get box_no
  const [boxNumber, setBoxNumber] = useState("");
  // Get affiliation
  const [affiliation, setAffiliation] = useState("");
  // Get isAdmin
  const [isAdmin, setIsAdmin] = useState(false);

  // *MEMOIZATION:

  let isCurrentUser = false;
  let lastUser;

  function memoizedFetchCurrentUser() {
    if (isCurrentUser) {
      return lastUser;
    }
    let user = fetchCurrentUser();
    lastUser = user;
    isCurrentUser = true;
    return user;
  }

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_LOCAL_HOST}/api/current_user`
      );
      if (response.ok) {

        //console.log("SUCCESS ENV");
        const data = await response.json();

        // User ID:

        setUserId(data.id);
        // Unique ID:

        let testUniqueId = data.unique_id;
        setUniqueId(testUniqueId);
        // if (testUniqueId) {
        // Display Name:
        let testDisplayName = data.display_name;
        setDisplayName(testDisplayName);
        // Box Number:
        let testBoxNumber = data.box_no;
        setBoxNumber(testBoxNumber);
        // }
        // Affiliation:
        let testAffiliation = data.affiliation;
        setAffiliation(testAffiliation);
        // isAdmin:
        let testIsAdmin = data.is_admin;
        setIsAdmin(testIsAdmin);

        console.log("Here is data UserContext: ", data);
      } else {
        console.error("Error fetching CURR:", response.status);
      }
    } catch (error) {
      console.error("Error fetching CURR:", error);
    } finally {
      setIsApiCallComplete(true);
    }
  };

  useEffect(() => {
    //console.log("Fetching current user for session...");
    memoizedFetchCurrentUser();
    //console.log("Fetched.");
    // console.log("displayName App.js: ", displayName);
  }, []);

  useEffect(() => {
    if (isApiCallComplete) {
      //console.log("uniqueId within separate useEffect:", uniqueId);
    }
  }, [isApiCallComplete, uniqueId]);

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        uniqueId,
        setUniqueId,
        displayName,
        setDisplayName,
        boxNumber,
        setBoxNumber,
        affiliation,
        setAffiliation,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
