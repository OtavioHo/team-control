const mongoose = require('mongoose')

const Manager = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  association: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  }
})

module.exports = mongoose.model('Manager', Manager)
