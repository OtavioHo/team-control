const mongoose = require('mongoose')

const Player = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

module.exports = Player
