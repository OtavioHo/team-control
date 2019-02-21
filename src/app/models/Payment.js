const mongoose = require('mongoose')

const Payment = new mongoose.Schema({
  value: {
    type: Number,
    required: true
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  date: {
    type: Date,
    default: Date.now()
  },
  description: String,
  Categorie: String
})

module.exports = mongoose.model('Payment', Payment)
