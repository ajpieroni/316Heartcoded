import React, { useState } from "react";
import "./ContactUs.css";
import { UserContext } from "../components/contexts/UserContext";

export default function ContactUs() {
  const [message, setMessage] = useState("Type your message here...");
  const [submittedMessage, setSubmittedMessage] = useState("");
  const [savedMessage, setSavedMessage] = useState(""); // New state variable to save the message
  const { uniqueId } = React.useContext(UserContext);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleMessageFocus = () => {
    if (message === "Type your message here...") {
      setMessage("");
    }
  };

  const handleMessageBlur = () => {
    if (message === "") {
      setMessage("Type your message here...");
    }
  };

  const getMessageClass = () => {
    if (message === "Type your message here...") {
      return "default-text";
    } else {
      return "user-text";
    }
  };

  const handleSaveMessage = () => {
    setSavedMessage(message); // Save the current message to the savedMessage state
  };

  const removeButton = () => {
    var a = document.getElementById("sub");
    if (a.style.display === "none") {
      a.style.display = "block";
    } else {
      a.style.display = "none";
    }
  };
  const removeMessageLabel = () => {
    var b = document.getElementById("message-label");
    if (b.style.display === "none") {
      b.style.display = "block";
    } else {
      b.style.display = "none";
    }
  };
  const removeContactLabel = () => {
    var c = document.getElementById("contact-label");
    if (c.style.display === "none") {
      c.style.display = "block";
    } else {
      c.style.display = "none";
    }
  };
  const removeMessageBox = () => {
    var d = document.getElementById("message");
    if (d.style.display === "none") {
      d.style.display = "block";
    } else {
      d.style.display = "none";
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmittedMessage(savedMessage); // Use the savedMessage instead of the message
    console.log("submitted message: ", savedMessage);
    setMessage("Type your message here..."); // Reset the message field after submit

    // Perform form submission or any other necessary actions
    const data = {
      message: savedMessage,
    };

    try {
      // Send the user input to the backend (Rails API) using a POST request
      const response = await fetch(
        `${process.env.REACT_APP_LOCAL_HOST}/api/contact_us_email/${uniqueId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      console.log(response, "here is response");
      if (response.ok) {
        // Successfully sent the data
        console.log("Data sent successfully.");
        console.log("message: ", data);
        // You can display a success message to the user if desired
      } else {
        // Failed to send the data
        console.log("Failed to send data.");
        // You can handle the error or display an error message to the user
      }
    } catch (error) {
      console.error("Error sending data:", error);
      // Handle the error or display an error message to the user
    }
  };

  return (
    <>
      <div className="ContactUs">
      {!isSubmitted ? (
        <div className="presubmit">
        <h1 className="page-title">Have a suggestion or question?</h1>
        <h2 id="contact-label"> Contact us through this form!</h2>
        <form id="contactForm" onSubmit={handleSubmit}>
          <label htmlFor="message" id="message-label">
            Message
          </label>
          <textarea
            id="message"
            aria-label="Enter your message"
            value={message}
            onChange={handleMessageChange}
            onFocus={handleMessageFocus}
            onBlur={handleMessageBlur}
            required
            className={getMessageClass()}
          ></textarea>

            <button
              type="submit"
              id = "sub"
              className="contact-button"
              onClick={() => {
                handleSaveMessage();
                removeButton();
                removeMessageBox();
                removeContactLabel();
                removeMessageLabel();
                setMessage("Type your message here...");
                setIsSubmitted(true);
              }}
            >
              Submit
            </button>
            </form>
        </div>

          ) : (
            <div className="postsubmit">
              <h1 className="page-title">Thank you for your feedback!</h1>
              <p id = "ask">Is there anything else you would like to share?</p>
              <div id= "postsubmit">
              <button
            type="submit"
            id="resub"
            className="contact-button"
            onClick={() => {
              setIsSubmitted(false);
            }}
          >
            Submit Another Ticket
          </button>
          </div>
            </div>

          )}
</div>
    </>
  );
}
