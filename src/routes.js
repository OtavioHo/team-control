const express = require('express')

const routes = express.Router()

const controllers = require('./app/controllers')

const authMiddleware = require('./app/middlewares/auth')

routes.post('/login', controllers.LoginController.login)

routes.post('/teams', controllers.TeamController.store)

routes.get('/teams/:team_id/payments', controllers.PaymentController.payments)
routes.post('/teams/:team_id/incomes', controllers.IncomeController.store)
routes.get('/teams/:team_id/incomes', controllers.IncomeController.incomes)
routes.post('/teams/:team_id/payments', controllers.PaymentController.store)
routes.get('/teams/:team_id/players', controllers.TeamController.players)
routes.get(
  '/teams/:team_id/players/:user_id',
  controllers.TeamController.player
)

routes.delete(
  '/teams/:team_id/incomes/:income_id',
  controllers.IncomeController.delete
)

routes.get('/users', controllers.PlayerController.show)
routes.post('/users', controllers.PlayerController.store)
routes.put('/users/:user_id', controllers.PlayerController.update)
routes.delete('/users/:user_id', controllers.PlayerController.delete)

routes.get('/users/teams', authMiddleware, controllers.TeamController.teams)

module.exports = routes
