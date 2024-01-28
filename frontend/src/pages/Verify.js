import React, { useState } from "react";
import { useSDK } from "@metamask/sdk-react";
import { useNavigate } from "react-router-dom";

export default function Verify({ setAccount }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // State to track loading

  const { sdk } = useSDK();
  const navigate = useNavigate();

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
      window.localStorage.setItem("account", JSON.stringify(accounts?.[0]));
    } catch (err) {
      alert(`failed to connect..`, err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true on form submission
    connect();
    const voterId = JSON.parse(window.localStorage.getItem("voterId"));
    const acc = JSON.parse(window.localStorage.getItem("account"));
    console.log(voterId);
    console.log(acc);
    try {
    //   const response = await fetch(
    //     `http://localhost:8080/addVoter?voterID=${voterId}&walletAddress=${acc}`,
    //     {
    //       method: "GET",
    //     }
    //   );
    const response = await fetch(`http://localhost:8080/addCandidate?name=${voterId}`)
      const data = await response.json();
      console.log(data);
      setPassword("");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Set loading to false after response is received
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
          disabled={loading} // Disable button while loading
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
