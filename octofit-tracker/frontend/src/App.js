import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import Leaderboard from './components/Leaderboard';

function App() {
  const apiBase = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/`
    : 'http://localhost:8000/api/';

  console.log('OctoFit frontend starting. API base:', apiBase);

  return (
    <div className="App container mt-4">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
        <div className="container-fluid">
          <NavLink className="navbar-brand text-white d-flex align-items-center" to="/">
            <img src="/octofitapp-small.svg" alt="OctoFit" style={{width:36,height:36,marginRight:12}} />
            <span>OctoFit</span>
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><NavLink className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} to="/activities">Activities</NavLink></li>
              <li className="nav-item"><NavLink className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} to="/teams">Teams</NavLink></li>
              <li className="nav-item"><NavLink className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} to="/users">Users</NavLink></li>
              <li className="nav-item"><NavLink className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} to="/workouts">Workouts</NavLink></li>
              <li className="nav-item"><NavLink className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} to="/leaderboard">Leaderboard</NavLink></li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="card">
        <div className="card-body">
          <Routes>
            <Route path="/" element={<div className="text-center"><h3>Welcome to OctoFit Tracker</h3><p>Select a section from the menu.</p></div>} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
