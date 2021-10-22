const express = require('express');
const router = express.Router();

const postsCtrl = require('../controllers/posts');

const isLoggedIn = require('../middlewares/isLoggedIn')
const belongsToUser = require('../middlewares/belongsToUser')

router.post('/communities/:id/posts', isLoggedIn, postsCtrl.create);
router.get('/posts/:id/edit', isLoggedIn, belongsToUser, postsCtrl.edit);
router.get('/posts/:id', isLoggedIn, postsCtrl.show);
router.put('/posts/:id', isLoggedIn, belongsToUser,postsCtrl.update);
router.delete('/posts/:id', isLoggedIn, belongsToUser,postsCtrl.delete);

module.exports = router