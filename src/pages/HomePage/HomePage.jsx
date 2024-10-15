import React from 'react';
import { Link } from 'react-router-dom';
import Banner from "../../components/banner/banner"

const HomePage = () => {
  return (
    
    <div>
      <Banner />
      <h1>Reaction Test</h1>
      <p>Choose a game mode:</p>
      <Link to="/single-player">
        <button>Single Player</button>
      </Link>
      <Link to="/vs-mode">
        <button>VS Mode</button>
      </Link>
      <Link to="/leaderboard">
        <button>Leaderboard</button>
      </Link>
    </div>
  );
};

export default HomePage;
