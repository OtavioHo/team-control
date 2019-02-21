const Income = require('../models/Income')

class IncomeController {
  async store (req, res) {
    const income = await Income.create(req.body)

    return res.json(income)
  }

  async all (req, res) {
    return res.json(await Income.find())
  }
}

module.exports = new IncomeController()
