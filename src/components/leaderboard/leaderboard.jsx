import React, { useEffect, useState } from "react";
import axios from "axios";
import "./leaderboard.scss";

const Leaderboard = ({ refresh, setRefresh }) => {
  const [scores, setScores] = useState([]);
  const [error, setError] = useState(null);

  const fetchScores = async () => {
    try {
      const response = await axios.get(
        "http://192.168.172.182:4000/api/leaderboard"
      );
      setScores(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to load leaderboard. Please try again later.");
    }
  };

  useEffect(() => {
    fetchScores();
  }, []);

  useEffect(() => {
    if (refresh) {
      fetchScores(); // Fetch new leaderboard scores when refresh is true
      setRefresh(false); // Reset the refresh state
    }
  }, [refresh, setRefresh]);

  return (
    <div className="leaderboard-container">
      <h2>Top 20 Reaction Times</h2>
      {error && <div className="error-message">{error}</div>}
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Login</th>
            <th>Location</th>
            <th>Reaction Time (ms)</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{score.login}</td>
              <td>{score.location}</td>
              <td>
                {score.reactionTime !== null ? score.reactionTime : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
