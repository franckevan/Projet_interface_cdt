import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";


const Statistiques = () => {
  const [stats, setStats] = useState({
    total: 0,
    enAttente: 0,
    accepte: 0,
    refuse: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchStats = async () => {
    try {
      const API_URL = process.env.REACT_APP_API_URL;
      const response = await fetch(`${API_URL}/stats`);
      if (!response.ok) throw new Error('Erreur de chargement des statistiques');
      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="container">
      {/* Navigation améliorée */}
      <div className="header-section">
        <h2>Statistiques des Candidatures</h2>
        <div className="stats-nav">
          <button 
            onClick={() => navigate('/')}
            className="nav-btn"
          >
            🏠 Accueil
          </button>
          <button 
            onClick={() => navigate('/add')}
            className="nav-btn"
          >
            ➕ Nouvelle
          </button>
          <button 
            onClick={() => navigate('/list')}
            className="nav-btn"
          >
            📋 Liste
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading">Chargement en cours...</div>
      ) : error ? (
        <div className="error-message">⚠️ {error}</div>
      ) : (
        <div className="stats-grid">
          <div className="stat-card total">
            <h3>📊 Total</h3>
            <p>{stats.total.toLocaleString()}</p>
          </div>

          <div className="stat-card en-attente">
            <h3>⏳ En attente</h3>
            <p>{stats.enAttente.toLocaleString()}</p>
          </div>

          <div className="stat-card acceptees">
            <h3>✅ Acceptées</h3>
            <p>{stats.accepte.toLocaleString()}</p>
          </div>

          <div className="stat-card refusees">
            <h3>❌ Refusées</h3>
            <p>{stats.refuse.toLocaleString()}</p>
          </div>
        </div>
      )}

      <div className="additional-info">
        <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
      </div>
    </div>
  );
};


export default Statistiques;