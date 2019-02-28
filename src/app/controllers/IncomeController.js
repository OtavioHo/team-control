const { Incomes, Teams } = require('../models')

class IncomeController {
  async store (req, res) {
    // store incomes
    const income = await Incomes.create({
      ...req.body,
      TeamId: req.params.team_id
    })

    const teams = await Teams.findOne({ where: { id: req.params.team_id } })
    // TODO: verify if team exists
    teams.update({ balance: teams.balance + income.value }) // update team's balance

    return res.json(income)
  }

  async show (req, res) {
    // Show one income by ID
    const income = await Incomes.findoOne({
      where: { id: req.params.income_id }
    })

    return res.json(income)
  }

  async incomes (req, res) {
    // List all incomes from a team
    const incomes = await Teams.findOne({
      where: { id: req.params.team_id },
      include: [
        {
          model: Incomes,
          as: 'Incomes'
        }
      ]
    })

    return res.json(incomes.Incomes)
  }

  async update (req, res) {
    // update income
    const income = await Incomes.findOne({
      where: { id: req.params.income_id }
    })

    if (req.body.value) {
      // verify if value was changed
      const diff = income.value - req.body.value
      const teams = await Teams.findOne({ where: { id: req.params.team_id } })
      teams.update({ balance: teams.balance - diff }) // update team's balance
    }

    income.update(req.body)

    return res.json(income)
  }

  async delete (req, res) {
    // delete income
    const income = await Incomes.findOne({
      where: { id: req.params.income_id }
    })

    const team = Teams.findOne({ where: { id: req.params.team_id } }) // find team
    team.update({ balance: team.balance - income.value })

    income.destroy()

    return res.status(200).json({ message: 'Income deleted' })
  }
}

module.exports = new IncomeController()
