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

  async update (req, res) {
    await Payments.update(req.body, {
      where: { id: req.params.payment_id }
    })
  }

  delete (req, res) {
    Payments.findOne({ where: { id: req.params.payment_id } }).then(payment => {
      payment.destroy()
    })
  }
}

module.exports = new PaymentController()
