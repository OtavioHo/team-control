const Player = require('../models/Player')
const Team = require('../models/Team')

class PlayerController {
  async store (req, res) {
    const { email } = req.body

    if (await Player.findOne({ email })) {
      return res.status(400).json({ error: 'Player already exists' })
    }

    if (!req.body.team) {
      return res.status(400).json({ error: 'Team not specified' })
    }

    const user = await Player.create(req.body)

    const player = {
      player: user._id,
      fee: req.body.fee
    }

    const team = await Team.findByIdAndUpdate(
      req.body.team,
      { $push: { players: player } },
      { new: true }
    )

    console.log(team)

    return res.json(user)
  }

  async all (req, res) {
    return res.json(await Player.find())
  }

  async show (req, res) {
    const player = await Player.findById(req.params.id)

    return res.json(player)
  }

  async update (req, res) {
    const player = await Player.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    return res.json(player)
  }

  async delete (req, res) {
    await Player.findByIdAndDelete(req.params.id)

    return res.send()
  }
}

module.exports = new PlayerController()
