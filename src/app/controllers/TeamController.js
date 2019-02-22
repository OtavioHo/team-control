const Team = require('../models/Team')
const mongoose = require('mongoose')

class TeamController {
  async store (req, res) {
    const team = await Team.create({
      ...req.body,
      manager: mongoose.Types.ObjectId(req.userId)
    })

    return res.json(team)
  }

  async all (req, res) {
    return res.json(await Team.find())
  }

  async show (req, res) {
    const team = await Team.findById(req.params.id).populate('players.player')

    return res.json(team)
  }

  async update (req, res) {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    return res.json(team)
  }

  async addPlayer (req, res) {
    if (!req.body.player) {
      return res.status(400).json({ error: 'player not specified' })
    }

    const player = {
      player: mongoose.Types.ObjectId(req.body.player),
      fee: req.body.fee
    }

    const team = await Team.findByIdAndUpdate(
      req.params.id,
      {
        $push: { players: player }
      },
      {
        new: true
      }
    )

    return res.json(team.populate('manager'))
  }

  async delete (req, res) {
    await Team.findByIdAndDelete(req.params.id)

    return res.send()
  }
}

module.exports = new TeamController()
