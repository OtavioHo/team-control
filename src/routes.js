const express = require('express')
const routes = express.Router()
const controllers = require('./app/controllers')

const authMiddleware = require('./app/middlewares/auth')

routes.post('/login', controllers.LoginController.login)
routes.post('/users', controllers.PlayerController.store)

routes.use(authMiddleware)

// Incomes
routes.post('/teams/:team_id/incomes', controllers.IncomeController.store)
routes.get('/teams/:team_id/incomes', controllers.IncomeController.incomes)
routes.delete(
  '/teams/:team_id/incomes/:income_id',
  controllers.IncomeController.delete
)
routes.put(
  '/teams/:team_id/incomes/:income_id',
  controllers.IncomeController.update
)

// Payments
routes.get('/teams/:team_id/payments', controllers.PaymentController.payments)
routes.post('/teams/:team_id/payments', controllers.PaymentController.store)
routes.delete(
  '/teams/:team_id/payments/:payment_id',
  controllers.PaymentController.delete
)
routes.put(
  '/teams/:team_id/payments/:payment_id',
  controllers.PaymentController.update
)

// Teams
routes.post('/teams', controllers.TeamController.store)
routes.get('/teams/:team_id/players', controllers.TeamController.players)
routes.post('/teams/:team_id/players', controllers.TeamController.addPlayer)
routes.get(
  '/teams/:team_id/players/:user_id',
  controllers.TeamController.player
)
routes.put('/teams/:team_id/admins', controllers.TeamController.addAdmin)

// Users
routes.get('/users', controllers.PlayerController.show)
routes.put('/users/:user_id', controllers.PlayerController.update)
routes.delete('/users/:user_id', controllers.PlayerController.delete)
routes.get('/users/teams', controllers.TeamController.teams)

module.exports = routes
