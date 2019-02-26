const { Users } = require('../models')

class LoginController {
  async login (req, res) {
    const { email, password } = req.body

    const user = await Users.findOne({ where: { email: email } })

    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    if (!(await user.compareHash(password))) {
      return res.status(400).json({ message: 'Invalid password' })
    }

    return res.json({ user, token: Users.generateToken(user) })
  }
}

module.exports = new LoginController()
