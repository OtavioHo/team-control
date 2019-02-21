const Payment = require('../models/Payment')

class PaymentController {
  async store (req, res) {
    const payment = await Payment.create(req.body)

    return res.json(payment)
  }

  async all (req, res) {
    return res.json(await Payment.find())
  }
}

module.exports = new PaymentController()
