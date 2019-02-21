const express = require('express')

const routes = express.Router()

const PlayerController = require('./app/controllers/PlayerController')
const TeamController = require('./app/controllers/TeamController')

routes.get('/', (req, res) => {
  return res.json({ teste: 'teste' })
})

routes.post('/players', PlayerController.store)
routes.get('/players', PlayerController.all)

routes.post('/teams', TeamController.store)
routes.get('/teams', TeamController.all)

module.exports = routes
