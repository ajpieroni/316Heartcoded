import React, { useState, useEffect } from "react";

function ChangeAvatar({ existingAvatarUrl, onAvatarChange }) {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [preview, setPreview] = useState(existingAvatarUrl || undefined);
  console.log("existingAvatarUrl:", existingAvatarUrl);
  useEffect(() => {
    if (!selectedAvatar) {
      if (!existingAvatarUrl) {
        setPreview(undefined);
      }
      return;
    }
    if(existingAvatarUrl){
        setPreview(existingAvatarUrl)
    }

    const objectUrl = URL.createObjectURL(selectedAvatar);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedAvatar, existingAvatarUrl]);

  const handleAvatarChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedAvatar(event.target.files[0]);
      onAvatarChange(event.target.files[0]); // Lifting state up
    }
  };

  return (
    <div>
      <label htmlFor="avatar">Avatar:</label>
      <input
        id="avatar"
        type="file"
        accept="image/*"
        onChange={handleAvatarChange}
      />
      {preview && (
        <img
          src={preview}
          alt="Avatar Preview"
          style={{ width: "100px", height: "100px" }}
        />
      )}
    </div>
  );
}

export default ChangeAvatar;
