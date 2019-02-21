const Payment = require('../models/Payment')

class PaymentController {
  async store (req, res) {
    const payment = await Payment.create(req.body)

    return res.json(payment)
  }

  async all (req, res) {
    return res.json(await Payment.find())
  }

  async show (req, res) {
    const payment = await Payment.findById(req.params.id)

    return res.json(payment)
  }

  async update (req, res) {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    return res.json(payment)
  }

  async delete (req, res) {
    await Payment.findByIdAndDelete(req.params.id)

    return res.send()
  }
}

module.exports = new PaymentController()
