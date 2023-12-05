import "./CreateProfile.css";
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import axios from "axios";
import SuccessModal from "../components/SuccessModal";
import { useLocation } from "react-router-dom";
import { UserContext } from "../components/contexts/UserContext";

export default function UserForm() {
  const location = useLocation();
  const username = localStorage.getItem("username") || "defaultUsername";
  const { user, setUser } = useContext(UserContext);
  const [emailError, setEmailError] = useState("");
  const [ageError, setAgeError] = useState("");
  console.log(user?.id);

  const initializeUser = () => {
    fetch(`http://localhost:3000/test_users/find_by_username/${username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setUser({
            ...user,
            name: data.name,
            id: data.id,
            birthday: data.birthday,
            gender: data.gender,
            preferences: data.preferences,
            bio: data.bio,
            location: data.location,
            password: data.password,
            red_flags: data.red_flags
          });
          sessionStorage.setItem("user", JSON.stringify(data));
        }
      })
      .catch((error) => {
        console.error("Failed to initialize user:", error);
      });
  };

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      initializeUser(); // Call the initializeUser function if no user data is in sessionStorage
    }
  }, [setUser]);

  // const validateEmail = (email) => {
  //   if (!email.endsWith("@duke.edu")) {
  //     setEmailError("Email must end with @duke.edu");
  //   } else {
  //     setEmailError("");
  //   }
  // };

  const patchUserData = (updatedData) => {
    if (user?.id) {
      fetch(`http://localhost:3000/test_users/${user?.id}`, {
        method: "PATCH",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: updatedData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("User updated:", data);
        })
        .catch((error) => {
          console.error("Failed to update user:", error);
        });
    } else {
      console.log("User ID not set. User data cannot be patched.");
    }
  };

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
  };

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    birthday: "",
    bio: "",
    location: "",
    preferences: "",
    // password: "",
    red_flags: [],
    username: username,
    email: "",
    avatar: null,
  });

  function StatesList({ onStateSelected }) {
    const [states, setStates] = useState([]);

    useEffect(() => {
      axios
        .get("http://localhost:3000/states")
        .then((response) => {
          setStates(response.data);
        })
        .catch((error) => {
          console.error("Error fetching states:", error);
        });
    }, [user?.id]);

    return (
      <div>
        <label>
          Select Your Location<span style={{ color: "red" }}>*</span>:
          <select onChange={onStateSelected} required value={formData.location}>
            <option value="">Select a state</option>
            {states.map((state) => (
              <option key={state.id} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </label>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "birthday") {
      validateAge(value);
    }

    // if (name === "email") {
    //   validateEmail(value);
    // }
  };
  const handleStateSelected = (e) => {
    const selectedState = e.target.value;
    setFormData({ ...formData, location: selectedState });
  };

  const handleRemoveRedFlag = (flagToRemove) => {
    const updatedRedFlags = selectedRedFlags.filter((flag) => flag !== flagToRemove);
    setSelectedRedFlags(updatedRedFlags);
    setFormData({ ...formData, red_flags: updatedRedFlags });
  };
  
  const validateAge = (birthdate) => {
    const today = new Date();
    const enteredDate = new Date(birthdate);
    //const age = today.getFullYear() - enteredDate.getFullYear();

    if (today < new Date(enteredDate.getFullYear() + 18, enteredDate.getMonth(), enteredDate.getDate())) {
      setAgeError("You need to be at least 18");
    } else {
      setAgeError("");
    }
  };
  const [selectedRedFlags, setSelectedRedFlags] = useState([]);
  // !TODO: not hardcoded
  const redFlagsOptions = [
    "Vanity",
    "Environmental Consciousness",
    "Spirituality",
    "Family",
    "Career",
    "Adventure",
    "Trustfulness",
    "Frugality",
    "Sentimentality",
    "Creativity",
    "Traditionalism",
    "Assertiveness",
  ];

  const handleRedFlagsChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedRedFlags(selectedOptions);
    console.log(selectedOptions);
    setFormData({ ...formData, red_flags: selectedOptions });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    validateAge(formData.birthday);
    if (ageError) {
      console.error("Age validation failed. Form not submitted.");
      alert("You are too young");
      return;
    }

    try {
      //console.log("here's form data:", formData);

      const newFormData = new FormData();
      newFormData.append("test_user[name]", formData.name);
      newFormData.append("test_user[gender]", formData.gender);
      newFormData.append("test_user[preferences]", formData.preferences);
      newFormData.append("test_user[birthday]", formData.birthday);
      newFormData.append("test_user[bio]", formData.bio);
      newFormData.append("test_user[location]", formData.location);
      formData.red_flags.forEach(flag => {
        newFormData.append("test_user[red_flags][]", flag);
      });
      
      newFormData.append("test_user[username]", formData.username);
      newFormData.append("test_user[email]", formData.email);
      // Append avatar file if available
      newFormData.append("test_user[avatar]", formData.avatar);
  
      // const response = await axios.post(`http://localhost:3000/test_users`, formData);
      patchUserData(newFormData);
      // onUserAdded(response.data);
      setIsSuccessModalOpen(true);
      setFormData({
        name: "",
        gender: "",
        preferences: "",
        birthday: "",
        bio: "",
        location: "",
        red_flags: [],
        // password: "",
        username: "",
        email: "",
        avatar: null,
        // password: "",
      });
    } catch (error) {
      setIsSuccessModalOpen(true);
      console.error("Error adding a new user:", error);
    }
  };

  //const [isPasswordUpdateVisible, setPasswordUpdateVisible] = useState(false);


  return (
    <div className="user-form">
      <div className="welcome-message">Welcome to HeartCoded</div>
      {/* <h2>Your username is {username}</h2> */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="avatar">Avatar:</label>
        <input id="avatar" type="file" accepts="image/*" onChange={(e)=>{
          setFormData({
            ...formData,
            avatar: e.target.files[0],
          });
          console.log(e.target.files[0]);
        }}
        />
        <label>
          Username<span style={{ color: "red" }}>*</span>:
          <input
            type="text"
            name="name"
            value={username}
            // onChange={handleInputChange}
            disabled
          />
        </label>
        <label>
          Name<span style={{ color: "red" }}>*</span>:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Email<span style={{ color: "red" }}>*</span>:
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          {emailError && <div style={{ color: "red" }}>{emailError}</div>}
        </label>
        <label>
          Gender<span style={{ color: "red" }}>*</span>:
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="F">Female</option>
            <option value="M">Male</option>
            <option value="Nonbinary">Nonbinary</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label>
        Birthday<span style={{ color: "red" }}>*</span>:
        <input
          type="date"
          name="birthday"
          value={formData.birthday}
          onChange={handleInputChange}
          required
        />
        {ageError && <div style={{ color: "red" }}>{ageError}</div>}
      </label>
        <StatesList onStateSelected={handleStateSelected} />
        <label>
          Who would you like to meet<span style={{ color: "red" }}>*</span>:
          <select
            name="preferences"
            value={formData.preferences}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="F">Female</option>
            <option value="M">Male</option>
            <option value="Nonbinary">Nonbinary</option>
            <option value="Open">Open to any</option>
          </select>
        </label>
        <label>
          Bio:
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
          />
        </label>
        <label>
          What are your red flags?
          <select
            multiple
            name="red_flags"
            style={{width: 953}}
            value={formData.red_flags}
            onChange={handleRedFlagsChange}
          >
            {redFlagsOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <div>
          {/* <p>Selected Red Flags:</p> */}
          <div>
            {selectedRedFlags.map((flag) => (
              <div key={flag} className="selected-flag">
                {flag}
                <button
                  type="button"
                  onClick={() => handleRemoveRedFlag(flag)}
                  className="remove-flag-button"
                >
                  &#x2715; {/* Unicode for a cross (X) */}
                </button>
              </div>
            ))}
          </div>
        </div>
        <br></br>
        <button className="profile-button" type="submit">
          Submit Info
        </button>

        {isSuccessModalOpen && (
          <SuccessModal
            message="Your information was successfully submitted."
            onClose={handleSuccessModalClose}
            redirectUrl="/"
          />
        )}
      </form>
    </div>
  );
}