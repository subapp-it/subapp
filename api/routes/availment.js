const route = require('express').Router()
const availmentController = require('../controllers/availment')
const isAuth = require('../middleware/is-auth')

route.post('/availment/:userId', isAuth, availmentController.insertAvailment)

module.exports = route