const { Teams, PlayersTeams, Users } = require('../models')

class TeamController {
  async store (req, res) {
    const team = await Teams.create(req.body)

    await PlayersTeams.create({
      UserId: req.body.user_id,
      TeamId: team.id,
      manager: true
    })

    return res.json(team)
  }

  async teams (req, res) {
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

  async players (req, res) {
    const team = await Teams.findOne({
      where: { id: req.params.team_id },
      include: [Users]
    })

    return res.json(team.Users)
  }

  async player (req, res) {
    const team = await Teams.findOne({
      where: { id: req.params.team_id },
      include: [
        {
          model: Users,
          through: { UserId: req.params.user_id }
        }
      ]
    })

    return res.json(team.Users[0])
  }

  async addPlayer (req, res) {
    await PlayersTeams.create({
      UserId: req.body.user_id,
      TeamId: req.params.team_id
    })

    res.status(200).json({ message: 'Player added' })
  }

  async addAdmin (req, res) {
    await PlayersTeams.update(
      { manager: true },
      { where: { UserId: req.body.user_id } }
    )

    return res.status(200).json({ message: 'Admin added' })
  }

  async update (req, res) {
    await Teams.update(req.body, { where: { id: req.params.team_id } })

    return res.status(200).json({ message: 'Team updated' })
  }

  delete (req, res) {
    Teams.findOne({ where: { id: req.params.team_id } }).then(team => {
      team.destroy()
    })

    return res.status(200).json({ message: 'Team deleted' })
  }
}

module.exports = new TeamController()
