const Manager = require('../models/Manager')

class ManagerController {
  async store (req, res) {
    const manager = await Manager.create(req.body)

    return res.json(manager)
  }

  async all (req, res) {
    return res.json(await Manager.find())
  }

  async show (req, res) {
    const manager = await Manager.findById(req.params.id)

    return res.json(manager)
  }

  async update (req, res) {
    const manager = await Manager.findByIdAndUpdate(req.pramas.id, req.body, {
      new: true
    })

    return res.json(manager)
  }

  async delete (req, res) {
    await Manager.findByIdAndDelete(req.params.id)

    return res.send()
  }
}

module.exports = new ManagerController()
