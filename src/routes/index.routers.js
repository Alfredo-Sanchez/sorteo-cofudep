const { Router } = require('express')
const router = Router();

const multer = require('multer');
const mimeTypes = require('mime-types')

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function(req, file, cb){
        // cb("", "sorteo" + "." + mimeTypes.extension(file.mimetype) )
        cb("", file.originalname)
    }

})

const upload = multer({
    storage: storage
})

//controllers
const controller = require('../controllers/index.controller')
//frontends
router.get('/',controller.index)
router.get('/winners', controller.winners)
router.get('/file', controller.file)
//backends
router.put('/winner/:id', controller.updateWinner)
router.get('/getwinners/', controller.getWinners )
router.get('/participants', controller.getParticipants)
router.post('/uploadfile', upload.single('fileupload') ,controller.uploadFile)


module.exports = router