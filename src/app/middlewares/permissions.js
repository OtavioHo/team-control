const { PlayersTeams } = require('../models')

class Permissions {
  async admin (req, res, next) {
    const team = await PlayersTeams.findOne({
      where: { UserId: req.userId, TeamId: req.params.team_id }
    })

    if (!team) {
      return res.status(400).json({ message: 'Player not in the team' })
    }

    if (!team.manager) {
      return res.status(400).json({ message: 'You are not an admin' })
    }

    return next()
  }
}

module.exports = new Permissions()
