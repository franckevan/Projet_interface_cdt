import mongoose from 'mongoose'

const candidatureSchema = mongoose.Schema(
  {
    entreprise: {
      type: String,
      minLength: 3,
      required: true 
    },
    status: {
      type: String,
      enum: ['En attente', 'Acceptée', 'Refusée'],
      default: 'En attente'
    },
    
  } , {
    timestamps: true
   }
)

export default mongoose.model('candidatures', candidatureSchema)