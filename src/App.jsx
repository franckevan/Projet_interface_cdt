// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FiPlus, FiList, FiBarChart2, FiHome } from 'react-icons/fi';
import AddCandidature from './components/AddCandidature.jsx';
import CandidaturesList from './components/CandidaturesList.jsx';
import Statistiques from './components/Statistiques.jsx';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Barre de navigation moderne */}
        <nav className="glass-navbar">
          <div className="nav-brand">
            <Link to="/" className="logo-link">JobTracker</Link>
          </div>
          
          <div className="nav-links">
            <Link to="/" className="nav-item">
              <FiHome className="nav-icon"/>
              <span>Accueil</span>
            </Link>
            <Link to="/add" className="nav-item">
              <FiPlus className="nav-icon"/>
              <span>Nouvelle</span>
            </Link>
            <Link to="/list" className="nav-item">
              <FiList className="nav-icon"/>
              <span>Candidatures</span>
            </Link>
            <Link to="/stats" className="nav-item">
              <FiBarChart2 className="nav-icon"/>
              <span>Stats</span>
            </Link>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/add" element={<AddCandidature />} />
            <Route path="/list" element={<CandidaturesList />} />
            <Route path="/stats" element={<Statistiques />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

const Home = () => (
  <div className="hero-section">
    <h1>Bienvenue sur JobTracker</h1>
    <p>Gérez vos candidatures avec élégance et efficacité</p>
  </div>
);

export default App;