const express = require('express');
const router = express.Router();

const postsCtrl = require('../controllers/posts');

const isLoggedIn = require('../middlewares/isLoggedIn')

router.post('/communities/:id/posts', isLoggedIn, postsCtrl.create);
router.get('/posts/:id', isLoggedIn, postsCtrl.show);
router.put('/posts/:id', isLoggedIn, postsCtrl.update);
router.delete('/posts/:id', isLoggedIn, postsCtrl.delete);

module.exports = router