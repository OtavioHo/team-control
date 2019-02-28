const { Matches } = require('../models')

class MatchesController {
  async store (req, res) {
    // Store one match
    const match = await Matches.create(req.body)

    return res.json(match)
  }

  async all (req, res) {
    // List all matches
    const matches = await Matches.findAll()

    res.json(matches)
  }

  async show (req, res) {
    // Show one match by ID
    const match = await Matches.findOne({ where: { id: req.params.match_id } })

    return res.json(match)
  }

  async delete (req, res) {
    // Delete match by ID
    const match = await Matches.findOne({ where: { id: req.params.match_id } })
    match.destroy()

    return res.json({ message: 'Match erased' })
  }
}

module.exports = new MatchesController()
