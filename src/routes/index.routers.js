const { Router } = require('express')
const router = Router();

//controllers
const controller = require('../controllers/index.controller')

//frontends
router.get('/',controller.index)

//backends
router.put('/winner/:id', controller.updateWinner)
router.get('/participants', controller.getParticipants)



module.exports = router