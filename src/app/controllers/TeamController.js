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

    const team = await Team.findById(req.params.id)

    for (let i = 0; i < team.players.length; i++) {
      if (team.players[i].player._id.toString() === req.body.player) {
        team.players.splice(i, 1)
        console.log(team)
        await team.save()
        return res.status(201).json({ message: 'player removed' })
      }
    }

    const player = {
      player: mongoose.Types.ObjectId(req.body.player),
      fee: req.body.fee
    }

    team.players.push(player)
    try {
      await team.save()
    } catch (e) {
      console.log(e)
    }

    return res.json(team)
  }

  async delete (req, res) {
    await Team.findByIdAndDelete(req.params.id)

    return res.send()
  }
}

module.exports = new TeamController()
