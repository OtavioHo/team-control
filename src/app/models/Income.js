const mongoose = require('mongoose')

const Income = new mongoose.Schema({
  value: {
    type: Number,
    required: true
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('Income', Income)
