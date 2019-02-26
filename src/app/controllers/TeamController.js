const { Teams, PlayersTeams, Users } = require('../models')

class TeamController {
  async store (req, res) {
    const team = await Teams.create(req.body)

    await PlayersTeams.create({ UserId: req.body.user_id, TeamId: team.id })

    return res.json(team)
  }

  async myTeams (req, res) {
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

module.exports = new TeamController()
