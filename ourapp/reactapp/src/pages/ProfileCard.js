import React, { useEffect, useState } from "react";

function ProfileCard({ user, onClose }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  useEffect(() => {
    fetchAvatarUrl();
  }, [user]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  const fetchAvatarUrl = async () => {
    try {
      const avatarResponse = await fetch(
        `http://localhost:3000/test_users/${user?.id}`
      );
      if (avatarResponse.ok) {
        const avatarData = await avatarResponse.json();
        setAvatarUrl(avatarData.avatar_url);
      } else {
        console.error("Error fetching avatar URL");
      }
    } catch (error) {
      console.error("Error fetching avatar URL:", error);
    }
  };
  function calculateAge(birthDateString) {
    const today = new Date();
    const birthDate = new Date(birthDateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }
  function getPronoun(gender) {
    switch (gender) {
      case "M":
        return "his";
      case "F":
        return "her";
      case "X":
        return "their";
      default:
        return "their";
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{user?.name}</h2>
        <img src={avatarUrl} style={{ maxWidth: 200 }} alt="User Avatar" />
        <p>Age: {calculateAge(user?.birthday)}</p>
        <p>Bio: {user?.bio}</p>
        <p>Birthday: {user?.birthday}</p>
        <p>Location: {user?.location}</p>
        <p>
          {user?.name} last updated {getPronoun(user?.gender)} profile on{" "}
          {formatDate(user?.updated_at)}
        </p>
        <button onClick={onClose} className="modal-button">
          Close
        </button>
      </div>
    </div>
  );
}

export default ProfileCard;
