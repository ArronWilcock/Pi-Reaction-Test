import React, { useEffect, useState } from "react";
import axios from "axios";
import "./bestScores.scss"; // Import the SCSS file for styling

const BestScores = () => {
  const [bestScores, setBestScores] = useState([]);
  const [bestAverageSite, setBestAverageSite] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the best scores per site
    axios
      .get("http://192.168.172.182:4000/api/bestPerSite")
      .then((response) => {
        setBestScores(response.data);
      })
      .catch((error) => {
        setError("Failed to fetch best scores.");
        console.error(error);
      });

    // Fetch the site with the best average score
    axios
      .get("http://192.168.172.182:4000/api/bestAverageSite")
      .then((response) => {
        setBestAverageSite(response.data);
      })
      .catch((error) => {
        setError("Failed to fetch best average score.");
        console.error(error);
      });
  }, []);

  return (
    <div className="leaderboard-container">
      <h2>Best Scores Per Site</h2>

      {error && <div className="error-message">{error}</div>}

      {/* Display best scores per site */}
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Site</th>
            <th>Best Reaction Time (ms)</th>
          </tr>
        </thead>
        <tbody>
          {bestScores.length > 0 ? (
            bestScores.map((score, index) => (
              <tr key={index}>
                <td>{score.site}</td>
                <td>{score.bestReactionTime}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No scores found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>Site with Best Average Score</h2>

      {/* Display site with best average score */}
      {bestAverageSite ? (
        <div className="best-average-site">
          <p>
            <strong>Site:</strong> {bestAverageSite.site}
          </p>
          <p>
            <strong>Average Reaction Time:</strong>{" "}
            {bestAverageSite.averageReactionTime} ms
          </p>
        </div>
      ) : (
        <p>No site found with the best average score.</p>
      )}
    </div>
  );
};

export default BestScores;
