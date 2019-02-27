const { Payments, Teams } = require('../models')

class PaymentController {
  async store (req, res) {
    const payment = await Payments.create({
      ...req.body,
      TeamId: req.params.team_id
    })

    const team = await Teams.findOne({ where: { id: req.params.team_id } })
    team.update({ balance: team.balance - payment.value })

    return res.json(payment)
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
