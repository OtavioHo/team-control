const mongoose = require('mongoose')

const Player = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  nickname: String,
  email: {
    type: String,
    unique: true
  },
  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: true
    }
  ]
})

module.exports = mongoose.model('Player', Player)
