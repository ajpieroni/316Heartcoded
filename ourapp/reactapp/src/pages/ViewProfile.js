import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../components/contexts/UserContext";
import "./ViewProfile.css";
import { Link } from "react-router-dom";
// import replicate from 'replicate';
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import DeleteProfile from "../components/DeleteButton";

export default function UserForm({ onUserAdded }) {
  const [ageError, setAgeError] = useState("");
  const [days, setDays] = useState(null);
  const [canEdit, setCanEdit] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    birthday: "",
    bio: "",
    location: "",
    preferences: "",
    password: "",
    red_flags: [],
    createdAt: "",
    updatedAt: "",
    username: "",
  });

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setLogin(true);
    }
  }, []);

  const handleRemoveRedFlag = (flagToRemove) => {
    const updatedRedFlags = selectedRedFlags.filter(
      (flag) => flag !== flagToRemove
    );
    setSelectedRedFlags(updatedRedFlags);
    setFormData({ ...formData, red_flags: updatedRedFlags });
  };

  useEffect(() => {
    if (user?.id) {
      axios
        .get(`http://localhost:3000/test_users/${user?.id}`)
        .then((response) => {
          let userData = response.data;
          setFormData({
            name: userData.name || "",
            gender: userData.gender || "",
            birthday: userData.birthday || "",
            bio: userData.bio || "",
            location: userData.location || "",
            preferences: userData.preferences || "",
            password: userData.password || "",
            red_flags: userData.red_flags || [],
            createdAt: userData.created_at || "",
            updatedAt: userData.updated_at || "",
            username: userData.username || "",
          });

          const joinedDate = new Date(userData.created_at);
          const today = new Date();
          const timeDiff = today - joinedDate;
          const calculatedDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
          setDays(calculatedDays);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [user?.id]);

  useEffect(() => {
    const fetchAvatarUrl = async () => {
      try {
        const response = await fetch(`http://localhost:3000/test_users/${user.id}`);
        if (response.ok) {
          const data = await response.json();
          setAvatarUrl(data.avatar_url);
        } else {
          console.error('Error fetching avatar URL');
        }
      } catch (error) {
        console.error('Error fetching avatar URL:', error);
      }
    };

    fetchAvatarUrl();
  }, [user?.id]);


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
    }, []);

    return (
      <div>
        <label>
          Your Location:
          <select
            onChange={onStateSelected}
            required
            value={formData.location}
            disabled
            className="disabled-field"
          >
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
  };

  const handleStateSelected = (e) => {
    const selectedState = e.target.value;
    setFormData({ ...formData, location: selectedState });
  };


  const validateAge = (birthdate) => {
    const today = new Date();
    const enteredDate = new Date(birthdate);

    if (
      today <
      new Date(
        enteredDate.getFullYear() + 18,
        enteredDate.getMonth(),
        enteredDate.getDate()
      )
    ) {
      setAgeError("You can't become younger by changing your birthday");
    } else {
      setAgeError("");
    }
  };

  const [isPasswordUpdateVisible, setPasswordUpdateVisible] = useState(false);
  const [selectedRedFlags, setSelectedRedFlags] = useState(
    formData.red_flags || []
  );

  useEffect(() => {
    setSelectedRedFlags(formData.red_flags || []);
  }, [formData.red_flags]);

  return (
    <>
      <Header />
      <div className="user-profile">
        <form>
          {user ? (
            <>
              {" "}
              <h1 className="main-title"> Hello, {formData.name}! </h1>
              <h2 style={{ fontFamily: "Varela Round" }}>
                {days !== null
                  ? days === 0
                    ? " You've been a user since today, thanks for joining!"
                    : ` You've been with us for ${days} ${
                        days === 1 ? "day." : "days."
                      }`
                  : ""}{" "}
              </h2>
            </>
          ) : (
            <></>
          )}

          <div className="profile-form">
            <div style={{ display: "flex", alignItems: "center" }}>
              <Link
                to={{
                  pathname: "/EditProfile",
                  state: { data: user },
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="white"
                  style={{ width: "30px", height: "30px" }}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </Link>
              <p>Last updated at: {formData.updatedAt}</p>
            </div>
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                disabled
                className="disabled-field"
              />
            </label>
            <label>
            <img
              src={avatarUrl}
              alt="Profile Avatar"
              style={{ maxHeight: "200px" }}
            />
            </label>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                disabled
                className="disabled-field"
              />
            </label>
            <label>
              Gender:
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
                disabled
                className="disabled-field"
              >
                <option value="">Select Gender</option>
                <option value="F">Female</option>
                <option value="M">Male</option>
                <option value="Nonbinary">Nonbinary</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label>
              Birthday:
              <input
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleInputChange}
                required
                disabled
                className="disabled-field"
              />
              {ageError && <div style={{ color: "red" }}>{ageError}</div>}
            </label>
            <StatesList onStateSelected={handleStateSelected} />
            <label>
              Who would you like to meet:
              <select
                name="preferences"
                value={formData.preferences}
                onChange={handleInputChange}
                required
                disabled
                className="disabled-field"
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
                disabled
                className="disabled-field"
              />
            </label>
            <label>Your red flags:</label>
            <div>
              <div>
                {selectedRedFlags.map((flag) => (
                  <div key={flag} className="selected-flag">
                    {flag}
                    <button
                      type="button"
                      onClick={() => handleRemoveRedFlag(flag)}
                      className="remove-flag-button"
                      disabled
                    >
                      &#x2715; {/* Unicode for a cross (X) */}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <br></br>
        </form>
        <div className="delete">
          <DeleteProfile />
        </div>
      </div>
    </>
  );
}
