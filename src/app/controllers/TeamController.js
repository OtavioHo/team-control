const Team = require('../models/Team')

class TeamController {
  async store (req, res) {
    const team = await Team.create(req.body)

    return res.json(team)
  }

  async all (req, res) {
    return res.json(await Team.find())
  }
}

module.exports = new TeamController()
