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
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
  
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          let maxWidth = 800;
          let maxHeight = 800;
  
          const scalingStep = 0.5; // Resize in steps of 50%
          while (width > maxWidth || height > maxHeight) {
            width *= scalingStep;
            height *= scalingStep;
          }
  
          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }
  
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          
          ctx.imageSmoothingQuality = 'high';
  
          ctx.drawImage(img, 0, 0, width, height);
  
          canvas.toBlob((blob) => {
            const resizedImage = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
  
            setImagePreviewUrl(URL.createObjectURL(resizedImage));
            setFormData((prevFormData) => ({
              ...prevFormData,
              profile_image: resizedImage,
            }));
          }, file.type);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file.');
    }
  };
  
  
  

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

  const validateEmail = (email) => {
    if (!email.endsWith("@duke.edu")) {
      setEmailError("Email must end with @duke.edu");
    } else {
      setEmailError("");
    }
  };

  const patchUserData = async (updatedData) => {
    if (user?.id) {
      const formData = new FormData();
  
      // Append non-file data to FormData
      for (const key in updatedData) {
        if (key !== 'profile_image') {
          formData.append(`test_user[${key}]`, updatedData[key]);
        }
      }
  
      // Append the profile_image to FormData
      if (updatedData.profile_image) {
        const reader = new FileReader();
  
        reader.onload = function () {
          // Convert the result to ArrayBuffer and append to FormData
          const arrayBuffer = this.result;
          formData.append('test_user[profile_image]', new Blob([arrayBuffer]));
          
          // Perform the fetch with FormData
          fetch(`http://localhost:3000/test_users/${user?.id}`, {
            method: 'PATCH',
            body: formData,
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then((data) => {
              console.log('User updated:', data);
            })
            .catch((error) => {
              console.error('Failed to update user:', error);
            });
        };
  
        // Read the profile_image as ArrayBuffer
        reader.readAsArrayBuffer(updatedData.profile_image);
      } else {
        // If no profile_image is provided, perform the fetch without it
        fetch(`http://localhost:3000/test_users/${user?.id}`, {
          method: 'PATCH',
          body: formData,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            console.log('User updated:', data);
          })
          .catch((error) => {
            console.error('Failed to update user:', error);
          });
      }
    } else {
      console.log('User ID not set. User data cannot be patched.');
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
    profile_image: null,
  });

  console.log(formData);

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

    if (name === "email") {
      validateEmail(value);
    }
  };
  const handleStateSelected = (e) => {
    const selectedState = e.target.value;
    setFormData({ ...formData, location: selectedState });
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    validateAge(formData.birthday);
    if (ageError) {
      console.error("Age validation failed. Form not submitted.");
      alert("You are too young");
      return;
    }

    try {
      console.log("here's form data:", formData);
      // const response = await axios.post(`http://localhost:3000/test_users`, formData);
      patchUserData(formData);
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
        // password: "",
      });
    } catch (error) {
      setIsSuccessModalOpen(true);
      console.error("Error adding a new user:", error);
    }
  };

  //const [isPasswordUpdateVisible, setPasswordUpdateVisible] = useState(false);

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

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  
  //   if (file) {
  //     const reader = new FileReader();
  
  //     reader.onloadend = () => {
  //       const base64Data = reader.result.split(",")[1];
  //       setFormData((prevFormData) => ({ ...prevFormData, profile_image: base64Data }));
  //     };
  
  //     reader.readAsDataURL(file);
  //   }
  // };
  
  

  return (
    <div className="user-form">
      <h2>Welcome to HeartCoded</h2>
      <h2>Your username is {username}</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
          Email (@duke.edu)<span style={{ color: "red" }}>*</span>:
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
      <label>
        Profile Picture:
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
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
        {imagePreviewUrl && (
  <img src={imagePreviewUrl} alt="Profile Preview" className="image-preview" />
)}

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
