const { Payments } = require('../models')

class PaymentController {
  async store (req, res) {
    const team = await Payments.create({
      ...req.body,
      TeamId: req.params.team_id
    })

    return res.json(team)
  }
}

module.exports = new PaymentController()
