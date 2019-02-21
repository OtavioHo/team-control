const mongoose = require('mongoose')

const Team = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  players: [
    {
      player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
      },
      fee: {
        type: Number,
        required: true,
        default: 0
      }
    }
  ],
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Manager'
  }
})

module.exports = mongoose.model('Team', Team)
