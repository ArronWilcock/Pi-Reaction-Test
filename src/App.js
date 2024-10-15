import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import SinglePlayerPage from './pages/SinglePlayer/SinglePlayerPage';
import VsModePage from './pages/VsMode/VsModePage';
import Leaderboard from './components/leaderboard/leaderboard';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/single-player" element={<SinglePlayerPage />} />
          <Route path="/vs-mode" element={<VsModePage />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
