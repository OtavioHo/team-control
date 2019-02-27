const { Incomes, Teams } = require('../models')

class IncomeController {
  async store (req, res) {
    const income = await Incomes.create({
      ...req.body,
      TeamId: req.params.team_id
    })

    return res.json(income)
  }

  async incomes (req, res) {
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
    await Incomes.update(req.body, {
      where: { id: req.params.income_id }
    })

    return res.status(200).json({ message: 'Income updated' })
  }

  async delete (req, res) {
    Incomes.findOne({ where: { id: req.params.income_id } }).then(income => {
      income.destroy()
    })

    return res.status(200).json({ message: 'Income deleted' })
  }
}

module.exports = new IncomeController()
