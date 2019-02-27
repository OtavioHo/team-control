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

  async update (req, res) {
    await Users.update(req.body, {
      where: { id: req.params.user_id }
    })

    return res.status(200).json({ message: 'User updated' })
  }

  delete (req, res) {
    Users.findOne({ where: { id: req.params.user_id } }).then(user => {
      user.destroy()
    })

    return res.status(200).json({ message: 'User deleted' })
  }
}

module.exports = new PlayerController()
