import React, { useState, useEffect } from "react";

export default function Poll() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/getCount");
        const data = await response.json();
        setResults(data.candidateList);
        setTotalVotes(calculateTotalVotes(data.candidateList));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching poll results:", error);
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  const calculateTotalVotes = (candidateList) => {
    return candidateList.reduce((total, candidate) => total + parseInt(candidate.voteCount), 0);
  };

  return (
    <div className="h-screen flex align-middle justify-center flex-col">
      {loading ? (
        <p className="mx-auto">Loading...</p>
      ) : (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Live Poll Results</h2>
          <p className="mb-4">Total Votes: {totalVotes}</p>
          <ul>
            {results.map((candidate, index) => (
              <li key={index} className="mb-2">
                <span className="font-semibold">{candidate.name}:</span>{" "}
                <span className="text-blue-600">{candidate.voteCount}</span> votes
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
