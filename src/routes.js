const express = require('express')

const routes = express.Router()

const controllers = require('./app/controllers')

routes.get('/', (req, res) => {
  return res.json({ teste: 'teste' })
})

routes.post('/teams', controllers.TeamController.store)

routes.post('/teams/:team_id/payments', controllers.PaymentController.store)
routes.post('/teams/:team_id/incomes', controllers.IncomeController.store)

routes.post('/users', controllers.PlayerController.store)
routes.get('/users', controllers.PlayerController.show)

module.exports = routes
