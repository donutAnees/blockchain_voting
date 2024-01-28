import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register({ setVoter }) {
  const navigate = useNavigate();
  const [voterId, setVoterId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    window.localStorage.setItem("voterId", voterId);
    setVoterId("");
    setPhoneNumber("");
    navigate("/register/verify");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md"
      >
        <label className="block mb-4">
          <span className="text-gray-700">Voter ID:</span>
          <input
            type="text"
            value={voterId}
            onChange={(e) => setVoterId(e.target.value)}
            className="p-1 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Phone Number:</span>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="p-1 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </label>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
}
