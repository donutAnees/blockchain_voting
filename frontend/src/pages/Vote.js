import React, { useState } from "react";

export default function Vote() {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [votingInProgress, setVotingInProgress] = useState(false);
  const [message, setMessage] = useState(""); // State to hold the message

  const candidates = [
    { id: 0, name: "John" },
    { id: 1, name: "Das" },
  ];

  const handleVote = async () => {
    if (selectedCandidate === null) {
      setMessage("Please select a candidate before voting."); // Set message
      return;
    }
    setVotingInProgress(true);
    const voterId = JSON.parse(window.localStorage.getItem("voterId"));
    const address = JSON.parse(window.localStorage.getItem("account"));
    const response = await fetch(
      `http://localhost:8080/vote?voterID=${voterId}&candidateID=${selectedCandidate}&address=${address}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    if (data.success) {
      setMessage("You have voted!"); // Set success message
    } else {
      setMessage(data.error); // Set error message
    }
    setVotingInProgress(false);
  };

  const handleSelectCandidate = (candidateId) => {
    setSelectedCandidate(candidateId);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md p-4 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-center mb-4">
          Vote for Your Candidate
        </h2>
        <form>
          {candidates.map((candidate) => (
            <div key={candidate.id} className="flex items-center mb-2">
              <input
                type="radio"
                id={`candidate${candidate.id}`}
                name="candidate"
                value={candidate.id}
                checked={selectedCandidate === candidate.id}
                onChange={() => handleSelectCandidate(candidate.id)}
                className="mr-2"
              />
              <label htmlFor={`candidate${candidate.id}`}>
                {candidate.name}
              </label>
            </div>
          ))}
          <button
            type="button"
            onClick={handleVote}
            disabled={votingInProgress}
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
          >
            {votingInProgress ? "Voting..." : "Vote"}
          </button>
          {message && (
            <p className="mt-2 text-center text-red-500">{message}</p> // Render message if present
          )}
        </form>
      </div>
    </div>
  );
}
