const { Users, Teams } = require('../models')

class PlayerController {
  async store (req, res) {
    // store new user
    const { email } = req.body

    if (
      await Users.findOne({
        where: { email }
      }) // verify if the email is already used
    ) {
      return res.status(400).json({ error: 'Email already used' })
    }

    const user = await Users.create(req.body) // create user

    return res.json(user)
  }

  async show (req, res) {
    // show all users
    const players = await Users.findAll()

    return res.json(players)
  }

  async update (req, res) {
    // update a user
    await Users.update(req.body, {
      where: { id: req.params.user_id }
    })

    return res.status(200).json({ message: 'User updated' })
  }

  delete (req, res) {
    // delete user
    Users.findOne({ where: { id: req.params.user_id } }).then(user => {
      user.destroy()
    })

    return res.status(200).json({ message: 'User deleted' })
  }

  async teams (req, res) {
    // List all teams from a user
    const teams = await Users.findOne({
      where: { id: req.userId },
      include: [
        {
          model: Teams,
          through: {
            where: { UserId: req.userId }
          }
        }
      ]
    })

    return res.json(teams.Teams)
  }
}

module.exports = new PlayerController()
