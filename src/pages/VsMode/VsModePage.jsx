import React, { useState, useEffect } from "react";
import axios from "axios";
import "./VsModePage.scss";
import Banner from "../../components/banner/banner";
import Leaderboard from "../../components/leaderboard/leaderboard";
import BestScores from "../../components/bestscores/bestScores";

const VsMode = () => {
  const [user1, setUser1] = useState({ login: "", location: "" });
  const [user2, setUser2] = useState({ login: "", location: "" });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // For controlling the popup visibility
  const [refreshLeaderboard, setRefreshLeaderboard] = useState(false); // Added state to refresh leaderboard

  // Handle input changes for both users
  const handleChange = (e, userSetter) => {
    const { name, value } = e.target;
    userSetter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to send start test request
  const startTest = async () => {
    try {
      setError(null); // Clear any previous errors
      setResult(null); // Clear previous results
      setShowPopup(false); // Hide any previous popup

      // Send request to the server
      const response = await axios.post(
        "http://192.168.172.182:4000/api/startTest",
        {
          users: [
            { login: user1.login, location: user1.location },
            { login: user2.login, location: user2.location },
          ],
        }
      );

      // Set the test result in state
      setResult(response.data);
      setShowPopup(true); // Show the popup
      setRefreshLeaderboard(true); // Trigger leaderboard refresh
    } catch (error) {
      setError("Failed to start test. Please try again.");
    }
  };

  // Automatically hide the popup after 10 seconds
  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 10000); // Hide after 10 seconds

      // Clean up the timer when the component unmounts or if showPopup changes
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <div className="vs-mode-container">
      <Banner />
      <div className="input-leaderboard-container">
        {/* User Input Forms */}
        <div className="input-container">
          <div className="input-group">
            <div className="input-player">
              <h3>Player 1</h3>
              <input
                type="text"
                name="login"
                placeholder="Enter login"
                value={user1.login}
                onChange={(e) => handleChange(e, setUser1)}
              />
              <select
                name="location"
                value={user1.location}
                onChange={(e) => handleChange(e, setUser1)}
              >
                <option value="" disabled>
                  Select team
                </option>
                <option value="RMEAM/M">RMEAM/M</option>
                <option value="DAYS SRMET">DAYS SRMET</option>
                <option value="DAYS">DAYS</option>
                <option value="RELIABILITY">RELIABILITY</option>
                <option value="BBM">BBM</option>
                <option value="PROJECTS & SAFETY">PROJECTS & SAFETY</option>
                <option value="AE">AE</option>
                <option value="RMEP">RMEP</option>
                <option value="SHIFT 1">SHIFT 1</option>
                <option value="SHIFT 2">SHIFT 2</option>
                <option value="SHIFT 3">SHIFT 3</option>
                <option value="SHIFT 4">SHIFT 4</option>
                <option value="RME APPRENTICE">RME APPRENTICE</option>
              </select>
            </div>

            <div className="input-player">
              <h3>Player 2</h3>
              <input
                type="text"
                name="login"
                placeholder="Enter login"
                value={user2.login}
                onChange={(e) => handleChange(e, setUser2)}
              />
              <select
                name="location"
                value={user2.location}
                onChange={(e) => handleChange(e, setUser2)}
              >
                <option value="" disabled>
                  Select team
                </option>
                <option value="RMEAM/M">RMEAM/M</option>
                <option value="DAYS SRMET">DAYS SRMET</option>
                <option value="DAYS">DAYS</option>
                <option value="RELIABILITY">RELIABILITY</option>
                <option value="BBM">BBM</option>
                <option value="PROJECTS & SAFETY">PROJECTS & SAFETY</option>
                <option value="AE">AE</option>
                <option value="RMEP">RMEP</option>
                <option value="SHIFT 1">SHIFT 1</option>
                <option value="SHIFT 2">SHIFT 2</option>
                <option value="SHIFT 3">SHIFT 3</option>
                <option value="SHIFT 4">SHIFT 4</option>
                <option value="RME APPRENTICE">RME APPRENTICE</option>
              </select>
            </div>
          </div>

          {/* Start Test Button */}
          <button className="start-test-button" onClick={startTest}>
            Start Test
          </button>
          <BestScores />
        </div>

        {/* Display the result or error */}
        {error && <div className="error-message">{error}</div>}
        {showPopup && result && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h4>Test Results</h4>
              <ul>
                {result.map((userResult, index) => (
                  <li key={index}>
                    {userResult.login} from {userResult.location}:&nbsp;
                    {userResult.falseStart
                      ? "False Start"
                      : userResult.reactionTime
                      ? `${userResult.reactionTime} ms`
                      : "No Reaction"}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <Leaderboard
          refresh={refreshLeaderboard}
          setRefresh={setRefreshLeaderboard}
        />
      </div>
    </div>
  );
};

export default VsMode;
