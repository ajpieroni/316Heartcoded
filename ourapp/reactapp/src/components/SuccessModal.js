import React from 'react';
import "./SuccessModal.css";
// import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";

const SuccessModal = ({ message, onClose, redirectUrl}) => {
  // const history = useHistory();
  // const handleRedirect = () => {
  //   history.push('/'); // Redirect to the home page
  //   onClose(); // Close the modal
  // };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Success!</h2>
        <p>{message}</p>
        <Link to={redirectUrl}>
          <div>
            <button onClick={onClose} className="modal-button">Close</button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SuccessModal;