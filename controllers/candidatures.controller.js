import ModelCandidature from '../../../models/candidature.model.js'

export const createCandidature = async (req, res) => {
  try {    
    const response = await ModelCandidature.create(req.body)
    res.status(201).json({ message: 'a été ajouté', response })
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const readCandidature = async (req, res) => {
  try {
    const response = await ModelCandidature.find()
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json(error.message)

  }
}

export const deleteCandidature = async (req, res) => {
  try {
    const { id } = req.params
    const response = await ModelCandidature.findByIdAndDelete(id)
    if (!response) {
      return res.status(404).json({ message: 'Candidature non trouvée' })
    }
    res.status(200).json({ message: 'Candidature supprimée avec succès' })
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const updateCandidature = async (req, res) => {
  try {
    const { id } = req.params
    const response = await ModelCandidature.findByIdAndUpdate(id, req.body, { new: true })
    if (!response) {
      return res.status(404).json({ message: 'Candidature non trouvée' })
    }
    res.status(200).json({ message: 'Candidature mise à jour avec succès', response })
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const readCandidatureById = async (req, res) => {
  try {
    const { id } = req.params
    const response = await ModelCandidature.findById(id)
    if (!response) {
      return res.status(404).json({ message: 'Candidature non trouvée' })
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const searchCandidatures = async (req, res) => {
  try {
    const filters = req.query
    const response = await ModelCandidature.find(filters)
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json(error.message)
  }
}