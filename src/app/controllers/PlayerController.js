const { Users } = require('../models')

class PlayerController {
  async store (req, res) {
    const { email } = req.body

    if (
      await Users.findOne({
        where: { email }
      })
    ) {
      return res.status(400).json({ error: 'Player already exists' })
    }

    const user = await Users.create(req.body)

    return res.json(user)
  }

  async show (req, res) {
    const players = await Users.findAll()

    return res.json(players)
  }
}

module.exports = new PlayerController()
