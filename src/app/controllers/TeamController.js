const { Teams, PlayersTeams, Users } = require('../models')

class TeamController {
  async store (req, res) {
    // Create team
    const team = await Teams.create(req.body)

    await PlayersTeams.create({
      UserId: req.body.user_id,
      TeamId: team.id,
      manager: true
    }) // Associate user to the created team as admin

    return res.json(team)
  }

  async all (req, res) {
    // List all teams
    const teams = await Teams.findAll()

    return res.json(teams)
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

  async players (req, res) {
    // List all players of the team
    const team = await Teams.findOne({
      where: { id: req.params.team_id },
      include: [Users]
    })

    return res.json(team.Users)
  }

  async player (req, res) {
    // Show one player from the team
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
    // Add a player to a team
    await PlayersTeams.create({
      UserId: req.body.user_id,
      TeamId: req.params.team_id
    })

    res.status(200).json({ message: 'Player added' })
  }

  async addAdmin (req, res) {
    // Add admin to a team
    await PlayersTeams.update(
      { manager: true },
      { where: { UserId: req.body.user_id } }
    )

    return res.status(200).json({ message: 'Admin added' })
  }

  async update (req, res) {
    // Update team
    await Teams.update(req.body, { where: { id: req.params.team_id } })

    return res.status(200).json({ message: 'Team updated' })
  }

  delete (req, res) {
    // Delete team
    Teams.findOne({ where: { id: req.params.team_id } }).then(team => {
      team.destroy()
    })

    return res.status(200).json({ message: 'Team deleted' })
  }
}

module.exports = new TeamController()
