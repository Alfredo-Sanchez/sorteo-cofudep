const { Router } = require('express')
const router = Router();

//controllers
const controller = require('../controllers/index.controller')

router.get('/',controller.index)
router.put('/winner/:id', controller.updateWinner)
router.get('/winners/:id', controller.winners )
router.get('/participants', controller.participants)


module.exports = router