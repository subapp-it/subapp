const route = require('express').Router()
const boardController = require('../controllers/board')
const isAuth = require('../middleware/is-auth')

route.get('/rdo', isAuth, boardController.findFilteredRdos)
route.get('/rdo/all', isAuth, boardController.findAllRdos)
route.get('/rdo/:rdoId', isAuth, boardController.findOneRdo)
route.post('/rdo/:userId', isAuth, boardController.insertRdo)
route.put('/rdo/:rdoId/:userId', isAuth, boardController.updateRdo)
route.delete('/rdo/:rdoId/:userId', isAuth, boardController.deleteRdo)
route.get('/availment/all', isAuth, boardController.findAllAvailments)
route.get('/availment/:availmentId', isAuth, boardController.findOneAvailment)
route.post('/availment/:userId', isAuth, boardController.insertAvailment)
route.put('/availment/:availmentId/:userId', isAuth, boardController.updateAvailment)
route.delete('/availment/:availmentId/:userId', isAuth, boardController.deleteAvailment)

module.exports = route