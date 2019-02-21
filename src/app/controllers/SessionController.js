const Manager = require('../models/Manager')

class SessionController {
  async store (req, res) {
    const { email, password } = req.body

    const user = await Manager.findOne({ email })

    if (!user) {
      return res.status(400).json({ error: 'User not found' })
    }

    if (!(await user.compareHash(password))) {
      return res.status(400).json({ error: 'Invalid password' })
    }

    return res.json({ user, token: Manager.generateToken(user) })
  }
}

module.exports = new SessionController()
