const { Incomes, Teams } = require('../models')

class IncomeController {
  async store (req, res) {
    // store incomes
    const income = await Incomes.create({
      ...req.body,
      TeamId: req.params.team_id
    })

    const teams = await Teams.findOne({ where: { id: req.params.team_id } })
    teams.update({ balance: teams.balance + income.value }) // update team's balance

    return res.json(income)
  }

  async incomes (req, res) {
    // show all incomes from a team
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
    Incomes.findOne({ where: { id: req.params.income_id } }).then(income => {
      income.destroy()
    })

    // TODO: update balance

    return res.status(200).json({ message: 'Income deleted' })
  }
}

module.exports = new IncomeController()
