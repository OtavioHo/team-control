const { Payments, Teams } = require('../models')

class PaymentController {
  async store (req, res) {
    const team = await Payments.create({
      ...req.body,
      TeamId: req.params.team_id
    })

    return res.json(team)
  }

  async payments (req, res) {
    const payments = await Teams.findOne({
      where: { id: req.params.team_id },
      include: [
        {
          model: Payments,
          as: 'Payments'
        }
      ]
    })

    return res.json(payments.Payments)
  }
}

module.exports = new PaymentController()
