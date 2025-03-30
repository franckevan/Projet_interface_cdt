import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";





const CandidaturesList = () => {
  const [candidatures, setCandidatures] = useState([]);
  const [filtreStatut, setFiltreStatut] = useState('');
  const [filtreEntreprise, setFiltreEntreprise] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchCandidatures = async () => {
    try {
      const API_URL = process.env.REACT_APP_API_URL;
      const response = await fetch(`${API_URL}/candidatures`);
      if (!response.ok) throw new Error('Erreur de chargement');
      const data = await response.json();
      setCandidatures(data);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidatures();
  }, []);

  const filteredCandidatures = candidatures.filter((candidature) => {
    const matchesStatut = filtreStatut ? candidature.statut === filtreStatut : true;
    const matchesEntreprise = filtreEntreprise ? 
      candidature.entreprise.toLowerCase().includes(filtreEntreprise.toLowerCase()) : true;
    return matchesStatut && matchesEntreprise;
  });

  return (
    <div className="container">
      <div className="header-section">
        <h2>Gestion des Candidatures</h2>
        {/* Ce Link est correct si l'import est ajouté */}
        <Link to="/add" className="btn-primary">
          + Nouvelle Candidature
        </Link>
      </div>
      <div className="filters">
        <input
          type="text"
          placeholder="Rechercher par entreprise..."
          value={filtreEntreprise}
          onChange={(e) => setFiltreEntreprise(e.target.value)}
          className="search-input"
        />
        
        <select 
          value={filtreStatut} 
          onChange={(e) => setFiltreStatut(e.target.value)}
          className="status-select"
        >
          <option value="">Tous les statuts</option>
          <option value="En attente">En attente</option>
          <option value="Acceptée">Acceptée</option>
          <option value="Refusée">Refusée</option>
        </select>
      </div>

      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <div className="candidatures-grid">
          {filteredCandidatures.length === 0 ? (
            <div className="empty-state">
              <p>Aucune candidature trouvée</p>
              <Link to="/add" className="btn-secondary">
                Ajouter votre première candidature
              </Link>
            </div>
          ) : (
            filteredCandidatures.map((candidature) => (
              <div key={candidature._id} className="candidature-card">
                <div className="card-header">
                  <h3>{candidature.entreprise}</h3>
                  <span className={`status-badge ${candidature.statut.replace(' ', '-').toLowerCase()}`}>
                    {candidature.statut}
                  </span>
                </div>
                <p className="poste">{candidature.poste}</p>
                <p className="date">
                  📅 {new Date(candidature.dateEnvoi).toLocaleDateString('fr-FR')}
                </p>
                <Link 
                  to={`/edit/${candidature._id}`} 
                  className="btn-edit"
                >
                  Modifier
                </Link>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CandidaturesList;

