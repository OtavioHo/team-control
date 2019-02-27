const { PlayersTeams } = require('../models')

class Permissions {
  async admin (req, res, next) {
    // verify if user is admim, it must run after player()
    if (!req.playerTeam.manager) {
      return res.status(400).json({ message: 'You are not an admin' })
    }

    return next()
  }

  async player (req, res, next) {
    // verify if player is in the team
    const playerTeam = await PlayersTeams.findOne({
      where: { UserId: req.userId, TeamId: req.params.team_id }
    })

    if (!playerTeam) {
      return res.status(400).json({ message: 'Player not in the team' })
    }

    req.playerTeam = playerTeam

    return next()
  }
}

module.exports = new Permissions()
