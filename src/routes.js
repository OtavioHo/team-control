const express = require('express')

const routes = express.Router()

const controllers = require('./app/controllers')

const authMiddleware = require('./app/middlewares/auth')

routes.post('/login', controllers.LoginController.login)

routes.post('/teams', controllers.TeamController.store)

routes.get('/teams/:team_id/payments', controllers.PaymentController.payments)
routes.post('/teams/:team_id/payments', controllers.PaymentController.store)
routes.post('/teams/:team_id/incomes', controllers.IncomeController.store)

routes.post('/users', controllers.PlayerController.store)
routes.get('/users', controllers.PlayerController.show)

routes.get('/users/teams', authMiddleware, controllers.TeamController.myTeams)

module.exports = routes
