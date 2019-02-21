const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')

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

Manager.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  this.password = await bcrypt.hash(this.password, 8)
})

Manager.methods = {
  compareHash (password) {
    return bcrypt.compare(password, this.password)
  }
}

Manager.statics = {
  generateToken ({ id }) {
    return jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.ttl
    })
  }
}

module.exports = mongoose.model('Manager', Manager)
