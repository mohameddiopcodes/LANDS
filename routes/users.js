const express = require('express');
const router = express.Router();
const multer = require('../config/multer')

const usersCtrl = require('../controllers/users')

const isLoggedIn = require('../middlewares/isLoggedIn')

/* GET users listing. */
router.post('/', usersCtrl.create);
router.get('/:id/avatar', isLoggedIn, usersCtrl.avatar)
router.post('/:id/avatar', isLoggedIn,  multer.single('avatar'), 
    usersCtrl.upload
)
router.get('/:id/edit', isLoggedIn, usersCtrl.edit);
router.put('/:id', isLoggedIn, usersCtrl.update);
router.delete('/:id', isLoggedIn, usersCtrl.delete);

module.exports = router;
