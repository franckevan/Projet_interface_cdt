import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const AddCandidature = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    entreprise: '',
    poste: '',
    lienOffre: '',
    dateEnvoi: new Date().toISOString().split('T')[0],
    statut: 'En attente'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const API_URL = process.env.REACT_APP_API_URL;
      const response = await fetch(`${API_URL}/candidatures`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de l\'ajout');
      }

      navigate('/list', { 
        state: { 
          successMessage: 'Candidature ajoutée avec succès!',
          newEntry: formData
        } 
      });

    } catch (error) {
      setError(error.message || "Une erreur est survenue lors de l'ajout");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'dateEnvoi' ? new Date(value).toISOString().split('T')[0] : value
    }));
  };

  return (
    <div className="container">
      <div className="header-section">
        <h2>Ajouter une Candidature</h2>
        <button 
          onClick={() => navigate('/list')}
          className="btn-secondary"
          disabled={isSubmitting}
        >
          ← Retour à la liste
        </button>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label>Entreprise *</label>
          <input
            type="text"
            name="entreprise"
            placeholder="Nom de l'entreprise"
            value={formData.entreprise}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Poste *</label>
          <input
            type="text"
            name="poste"
            placeholder="Intitulé du poste"
            value={formData.poste}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Lien de l'offre</label>
          <input
            type="url"
            name="lienOffre"
            placeholder="https://..."
            value={formData.lienOffre}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Date d'envoi *</label>
          <input
            type="date"
            name="dateEnvoi"
            value={formData.dateEnvoi}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Statut *</label>
          <select 
            name="statut"
            value={formData.statut}
            onChange={handleChange}
            className="status-select"
          >
            <option value="En attente">⏳ En attente</option>
            <option value="Acceptée">✅ Acceptée</option>
            <option value="Refusée">❌ Refusée</option>
          </select>
        </div>

        <button 
          type="submit" 
          className="btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Envoi en cours...' : 'Ajouter la candidature'}
        </button>
      </form>
    </div>
  );
};

export default AddCandidature;