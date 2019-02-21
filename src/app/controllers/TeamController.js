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
    return res.json(await Team.find().populate('manager'))
  }
}

module.exports = new TeamController()
