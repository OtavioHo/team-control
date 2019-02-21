const Income = require('../models/Income')

class IncomeController {
  async store (req, res) {
    const income = await Income.create(req.body)

    return res.json(income)
  }

  async all (req, res) {
    return res.json(await Income.find())
  }

  async show (req, res) {
    const income = await Income.findById(req.params.id)

    return res.json(income)
  }

  async update (req, res) {
    const income = await Income.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    return res.json(income)
  }

  async delete (req, res) {
    await Income.findByIdAndDelete(req.params.id)
  }
}

module.exports = new IncomeController()
