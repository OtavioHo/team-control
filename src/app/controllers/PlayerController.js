const Player = require('../models/Player')

class PlayerController {
  async store (req, res) {
    const { email } = req.body

    if (await Player.findOne({ email })) {
      return res.status(400).json({ error: 'Player already exists' })
    }

    const user = await Player.create(req.body)

    return res.json(user)
  }

  async all (req, res) {
    return res.json(await Player.find())
  }
}

module.exports = new PlayerController()
