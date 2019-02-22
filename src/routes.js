const express = require('express')

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')

const controllers = require('./app/controllers')

routes.get('/', (req, res) => {
  return res.json({ teste: 'teste' })
})

routes.post('/players', controllers.PlayerController.store)
routes.get('/players', controllers.PlayerController.all)

routes.post('/teams', authMiddleware, controllers.TeamController.store)
routes.get('/teams', controllers.TeamController.all)
routes.put('/teams/:id', controllers.TeamController.addPlayer)
routes.get('/teams/:id', controllers.TeamController.show)

routes.post('/incomes', controllers.IncomeController.store)
routes.get('/incomes', controllers.IncomeController.all)

routes.post('/managers', controllers.ManagerController.store)
routes.get('/managers', controllers.ManagerController.all)

routes.post('/payments', controllers.PaymentController.store)
routes.get('/payments', controllers.PaymentController.all)

routes.post('/session', controllers.SessionController.store)

routes.get('/teste', authMiddleware, (req, res) => res.json({ ok: true }))

module.exports = routes
