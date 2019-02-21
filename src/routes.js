const express = require('express')

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')

const PlayerController = require('./app/controllers/PlayerController')
const TeamController = require('./app/controllers/TeamController')
const IncomeController = require('./app/controllers/IncomeController')
const ManagerController = require('./app/controllers/ManagerController')
const PaymentController = require('./app/controllers/PaymentController')
const SessionController = require('./app/controllers/SessionController')

routes.get('/', (req, res) => {
  return res.json({ teste: 'teste' })
})

routes.post('/players', PlayerController.store)
routes.get('/players', PlayerController.all)

routes.post('/teams', TeamController.store)
routes.get('/teams', TeamController.all)

routes.post('/incomes', IncomeController.store)
routes.get('/incomes', IncomeController.all)

routes.post('/managers', ManagerController.store)
routes.get('/managers', ManagerController.all)

routes.post('/payments', PaymentController.store)
routes.post('/payments', PaymentController.all)

routes.post('/session', SessionController.store)

routes.get('/teste', authMiddleware, (req, res) => res.json({ ok: true }))

module.exports = routes
