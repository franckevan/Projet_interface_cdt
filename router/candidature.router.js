import express from 'express'
import { 
  createCandidature, 
  readCandidature, 
  deleteCandidature, 
  updateCandidature, 
  readCandidatureById, 
  searchCandidatures 
} from './candidatures.controller.js'

const router = express.Router()

router.post('/create', createCandidature)
router.get('/read', readCandidature)
router.delete('/delete/:id', deleteCandidature)
router.put('/update/:id', updateCandidature)
router.get('/read/:id', readCandidatureById)
router.get('/search', searchCandidatures)

export default router