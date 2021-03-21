const { Router } = require('express')
const router = Router()

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

// CONTROLLERS
const controller = require('../controllers/uploadfile.controllers')

// ROUTES
router.get('/file', controller.file)
router.post('/uploadfile', upload.single('fileupload') ,controller.uploadFile)

module.exports = router;