import React, { useState } from "react";
import { useSDK } from "@metamask/sdk-react";

export default function Verify({ setAccount }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // State to hold the message

  const { sdk } = useSDK();

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
      window.localStorage.setItem("account", JSON.stringify(accounts?.[0]));
    } catch (err) {
      setMessage(`Failed to connect: ${err.message}`); // Set error message
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    connect();
    const voterId = JSON.parse(window.localStorage.getItem("voterId"));
    const acc = JSON.parse(window.localStorage.getItem("account"));
    try {
      const response = await fetch(
        `http://localhost:8080/addVoter?voterID=${voterId}&walletAddress=${acc}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setPassword("");
      if (data.success) {
        setMessage("You are successfully registered"); // Set success message
      } else {
        setMessage(data.error); // Set error message
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while processing your request."); // Set generic error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md"
      >
        <label className="block mb-4">
          <span className="text-gray-700">OTP:</span>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-1 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </label>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
        {message && (
          <p className="mt-2 text-center text-red-500">{message}</p> // Render message if present
        )}
      </form>
    </div>
  );
}
