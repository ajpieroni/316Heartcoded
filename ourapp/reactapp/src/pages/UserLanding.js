// import './Landing.css';
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
export default function UserLanding() {
  // Username variable
  const [userName, setUserName] = useState();
// !TODO: How to route from backend to frontend.
 const fetchUserName = () => {
    fetch(`http://localhost:3000/test_users/1`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data.name);
        setUserName(data.name);
        
      })
      .catch((error) => {
        console.log("Error fetching the latest name:", error);
      });
  };

  useEffect(() => {
    fetchUserName();
    console.log("hello!");
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 bg-gradient-to-b from-pink-300 via-red-400 to-red-500">
      {/* Hero Section */}
      <div className="text-white text-center mt-20">
        <h1 className="text-4xl font-bold mb-4">Welcome to HeartCoded</h1>
        <p className="text-xl mb-6">Find your soulmate today!</p>
        <button className="bg-white text-red-500 hover:bg-red-400 hover:text-white px-6 py-2 rounded-full font-semibold">
          Sign Up Now
        </button>
      </div>

      {/* Features */}
      <div className="flex flex-wrap justify-center mt-16 mb-10 space-x-8 space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-start justify-center w-80 h-auto space-y-4 mb-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Create Your Profile
          </h2>
          <p className="text-gray-700">
            Personalize your space. Add a profile picture, write a bio, and list
            your interests for potential matches to see.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-start justify-center w-80 h-auto space-y-4">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Find Your Match
          </h2>
          <p className="text-gray-700">
            Answer tailored questions to help us find the best match for you.
            New questions added weekly to refine your matches!
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-start justify-center w-80 h-auto space-y-4">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Chat & Connect
          </h2>
          <p className="text-gray-700">
            Engage in live chats, get prompted conversation starters, and decide
            if you're ready to take the next step with your match.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-start justify-center w-80 h-auto space-y-4">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Dynamic Questions
          </h2>
          <p className="text-gray-700">
            Our system ensures a variety of questions for you. Plus, you can
            answer new ones as they come, keeping your profile fresh and
            engaging.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-start justify-center w-80 h-auto space-y-4">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Give Feedback
          </h2>
          <p className="text-gray-700">
            Rate your matches and share your thoughts. Your feedback helps us
            refine the matching process for an enhanced experience.
          </p>
        </div>
      </div>

      {/* Call-to-Action */}
      <div className="text-center text-white mb-20">
        <h2 className="text-3xl font-bold mb-4">Ready to find your match?</h2>
        <button className="bg-white text-red-500 hover:bg-red-400 hover:text-white px-6 py-2 rounded-full font-semibold">
          Join HeartCoded, {userName}!
        </button>
      </div>
    </main>
  );
}