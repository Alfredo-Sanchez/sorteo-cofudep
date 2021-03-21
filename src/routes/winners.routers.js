const { Router } = require('express')
const router = Router()

const controller = require('../controllers/winners.controller')

router.get('/winners', controller.winners)
router.get('/getwinners/', controller.getWinners )

module.exports = router
