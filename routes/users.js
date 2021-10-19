const express = require('express');
const router = express.Router();

const usersCtrl = require('../controllers/users')

/* GET users listing. */
router.post('/', usersCtrl.create);
router.get('/:id/edit', usersCtrl.edit);
router.put('/:id', usersCtrl.update);
router.delete('/:id', usersCtrl.delete);

module.exports = router;
