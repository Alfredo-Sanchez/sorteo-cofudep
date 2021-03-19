const { Router } = require('express')
const router = Router();

//controllers
const controller = require('../controllers/index.controller')
//frontends
router.get('/',controller.index)
router.get('/winners', controller.winners)
//backends
router.put('/winner/:id', controller.updateWinner)
router.get('/getwinners/', controller.getWinners )
router.get('/participants', controller.getParticipants)


module.exports = router