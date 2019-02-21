const Manager = require('../models/Manager')

class ManagerController {
  async store (req, res) {
    const manager = await Manager.create(req.body)

    return res.json(manager)
  }

  async all (req, res) {
    return res.json(await Manager.find())
  }
}

module.exports = new ManagerController()
