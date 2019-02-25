const { Teams, PlayersTeams } = require('../models')

class TeamController {
  async store (req, res) {
    const team = await Teams.create(req.body)

    await PlayersTeams.create({ UserId: req.body.user_id, TeamId: team.id })

    return res.json(team)
  }
}

module.exports = new TeamController()
