const express = require('express')

const routes = express.Router()

const PlayerController = require('./app/controllers/PlayerController')

routes.get('/', (req, res) => {
  return res.json({ teste: 'teste' })
})

routes.post('/players', PlayerController.store)
routes.get('/players', PlayerController.players)

module.exports = routes
