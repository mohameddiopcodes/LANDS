const multer = require('multer')({
    limits: {
      fileSize: 1000000
    },
    fileFilter(req, file, cb) {
      if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        cb(new Error('File must be either jpg, jpeg or png'))
      }
      cb(undefined, true)
    }
  })

module.exports = multer