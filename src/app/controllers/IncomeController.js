const { Incomes } = require('../models')

class IncomeController {
  async store (req, res) {
    const team = await Incomes.create({
      ...req.body,
      TeamId: req.params.team_id
    })

    return res.json(team)
  }
}

module.exports = new IncomeController()
