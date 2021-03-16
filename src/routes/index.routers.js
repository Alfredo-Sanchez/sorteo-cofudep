const { Router } = require('express')
const router = Router();

//controllers
const controller = require('../controllers/index.controller')

router.get('/',controller.index)
router.get('/ganador/:id', controller.ganador )


module.exports = router