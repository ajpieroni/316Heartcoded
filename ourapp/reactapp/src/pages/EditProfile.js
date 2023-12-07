import "./CreateProfile.css";
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import axios from "axios";
import { UserContext } from "../components/contexts/UserContext";
import SuccessModal from "../components/SuccessModal";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

export default function UserForm() {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [ageError, setAgeError] = useState("");

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
  };

  const handleRemoveRedFlag = (flagToRemove) => {
    const updatedRedFlags = selectedRedFlags.filter(
      (flag) => flag !== flagToRemove
    );
    setSelectedRedFlags(updatedRedFlags);
    setFormData({ ...formData, red_flags: updatedRedFlags });
  };

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    birthday: "",
    bio: "",
    location: "",
    preferences: "",
    password: "",
    red_flags: [],
    avatar: null,
  });
  const { user, setUser } = useContext(UserContext);
  const username = localStorage.getItem("username") || "defaultUsername";
  const initializeUser = () => {
    fetch(`http://localhost:3000/test_users/find_by_username/${username}`)
      .then((response) => {
        console.log("response:", response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("dataaa", data);
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
            red_flags: data.red_flags,
            avatar: data.avatar || null,
          });
          setFormData({
            name: data.name || "",
            gender: data.gender || "",
            birthday: data.birthday || "",
            bio: data.bio || "",
            location: data.location || "",
            preferences: data.preferences || "",
            password: data.password || "",
            red_flags: data.red_flags || [],
            avatar: data.avatar || null,
          });
          sessionStorage.setItem("user", JSON.stringify(data));
        }
      })
      .catch((error) => {
        console.error("Failed to initialize user:", error);
      });
  };

  useEffect(() => {
    initializeUser();
  }, [setUser]);

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

  // const url = `http://localhost:3000/test_users/${user.id}`;
  // console.log('PATCH URL:', url);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({ ...formData, [name]: value });
    if (name === "birthday") {
      validateAge(value);
    }
    console.log("handleInputChange", formData);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedAvatar(file);
    setFormData({ ...formData, avatar: file });
  };

  const handleStateSelected = (e) => {
    const selectedState = e.target.value;
    setFormData({ ...formData, location: selectedState });
      newFormData.append("test_user[avatar]", formData.avatar);

  };
  const newFormData = new FormData();


  const validateAge = (birthdate) => {
    const today = new Date();
    const enteredDate = new Date(birthdate);
    //const age = today.getFullYear() - enteredDate.getFullYear();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateAge(formData.birthday);
    if (ageError) {
      console.error("Age validation failed. Form not submitted.");
      alert("You are too young");
      return;
    }
  
    try {
      newFormData.append("test_user[username]", username);
      if(formData.name) {
        newFormData.append("test_user[name]", formData.name);

      }
      newFormData.append("test_user[gender]", formData.gender);
      newFormData.append("test_user[preferences]", formData.preferences);
      newFormData.append("test_user[birthday]", formData.birthday);
      newFormData.append("test_user[bio]", formData.bio);
      newFormData.append("test_user[location]", formData.location);
      formData.red_flags.forEach((flag) => {
        newFormData.append("test_user[red_flags][]", flag);
      });

      if(formData.avatar){
        newFormData.append("test_user[avatar]", formData.avatar);

      }

      // Append avatar file if available

      // const response = await axios.post(`http://localhost:3000/test_users`, formData);
      console.log("newFormData", newFormData);
  
      let response;
      if (user?.id) {
        response = await axios.patch(
          `http://localhost:3000/test_users/${user?.id}`,
          newFormData
        );
      } else {
        response = await axios.post(
          `http://localhost:3000/test_users`,
          newFormData
        );
      }
  
      setIsSuccessModalOpen(true);
      setFormData({
        name: "",
        gender: "",
        preferences: "",
        birthday: "",
        bio: "",
        location: "",
        red_flags: [],
        password: "",
        avatar: null,
      });
      // Handle response here if needed
    } catch (error) {
      console.error("Error adding or updating user:", error);
      setIsSuccessModalOpen(true);
    }
  };
  

  const [confirmation, setConfirmation] = useState("");
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (confirmation === "DELETE") {
      try {
        if (!user || !user.id) {
          console.error("User ID is not available.");
          return;
        }

        const response = await axios.delete(
          `http://localhost:3000/test_users/${user.id}`
        );

        if (response.status === 200) {
          console.log("User deleted successfully");
          // Handle successful deletion, e.g., redirect or update state
        } else {
          console.error("Failed to delete user");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
      setConfirmation("");
      setShowConfirmationDialog(false);
      navigate("/");
    }
  };

  const [isPasswordUpdateVisible, setPasswordUpdateVisible] = useState(false);

  const [selectedRedFlags, setSelectedRedFlags] = useState(
    formData.red_flags || []
  );

  useEffect(() => {
    setSelectedRedFlags(formData.red_flags || []);
  }, [formData.red_flags]);

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

  const [avatarUrl, setAvatarUrl] = useState(null);
  useEffect(() => {
    const fetchAvatarUrl = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/test_users/${user.id}`
        );
        if (response.ok) {
          const data = await response.json();
          setAvatarUrl(data.avatar_url);
        } else {
          console.error("Error fetching avatar URL");
        }
      } catch (error) {
        console.error("Error fetching avatar URL:", error);
      }
    };

    fetchAvatarUrl();
  }, [user?.id]);
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setAvatarUrl(objectUrl); // Set the generated URL for preview
      setFormData({ ...formData, avatar: file }); // Update formData with the file
    }
  };

  return (
    <>
      <Header />
      <div className="user-form-edit">
        {/* <h2>Nice to see you, {user.name.split(' ')[0]}!</h2> */}
        <h1 style={{ marginLeft: "20px" }}>Edit Your Information</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* <label htmlFor="avatar">Avatar:</label>
        <input id="avatar" type="file" accepts="image/*" onChange={(e)=>{
          setFormData({
            ...formData,
            avatar: e.target.files[0],
          });
          console.log(e.target.files[0]);
        }}
        /> */}
        <label> Avatar Preview
          <img
            src={avatarUrl}
            alt="Profile Avatar"
            style={{ maxHeight: "200px" }}
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

          <label htmlFor="avatar">
            Change Avatar:{" "}
            <input
              id="avatar"
              type="file"
              accepts="image/*"
              onChange={handleAvatarChange}
            />
          </label>
          {/* {/* <label htmlFor="avatar">Avatar</label>
        <input
          type="file"
          id="avatar"
          name="avatar"
          onChange={handleFileChange}
        />
        <label>
        {selectedAvatar && (
          <div>
            <p>Selected Avatar:</p>
            <img src={URL.createObjectURL(selectedAvatar)} alt="Selected Avatar" />
          </div>
        )}
          Name<span style={{ color: 'red' }}>*</span>: 
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </label> */}
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
                    &#x2715; {/* X symbol */}
                  </button>
                </div>
              ))}
            </div>
          </div>
          {/* <button className="profile-button"
        type="button"
        onClick={() => setPasswordUpdateVisible(!isPasswordUpdateVisible)}
      >
        Update password?
      </button>
      {isPasswordUpdateVisible && (
        <label>
          Update Password: 
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            // required
          />
        </label>
        )} */}
          <br></br>
          <button className="profile-button" type="submit">
            Submit Info
          </button>

          {isSuccessModalOpen && (
            <SuccessModal
              message="Your information was successfully updated!"
              onClose={handleSuccessModalClose}
              redirectUrl="/UserSignedIn"
            />
          )}

          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button
                onClick={() => setShowConfirmationDialog(true)}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Delete Profile
              </button>
            </div>

            {showConfirmationDialog && (
              <div className="modal-overlay">
                <div className="modal">
                  <p>Please enter "DELETE" to confirm:</p>
                  <input
                    type="text"
                    value={confirmation}
                    onChange={(e) => setConfirmation(e.target.value)}
                  />
                  {/* <Link to={{
            pathname: '/',
            state: { data: user }
            }}> */}
                  <button onClick={handleDelete} className="modal-button">
                    Confirm
                  </button>
                  {/* </Link> */}
                  <button
                    onClick={() => setShowConfirmationDialog(false)}
                    className="modal-button"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
