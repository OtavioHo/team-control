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
    const payment = await Payments.findOne({
      where: { id: req.params.payment_id }
    })

    if (req.body.value) {
      // verify if value was changes
      const diff = payment.value - req.body.value
      const team = Teams.findOne({ where: { id: req.params.team_id } })
      team.update({ balance: team.balance + diff }) // update team's balance
    }

    payment.update(req.body)

    return res.json(payment)
  }

  delete (req, res) {
    // delete payment
    Payments.findOne({ where: { id: req.params.payment_id } }).then(payment => {
      payment.destroy()
    })

    // TODO: update balance

    return res.status(200).json({ message: 'Payment deleted' })
  }
}

module.exports = new PaymentController()
