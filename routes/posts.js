const express = require('express');
const router = express.Router();

const postsCtrl = require('../controllers/posts');

router.post('/communities/:id/posts', postsCtrl.create);
router.get('/posts/:id', postsCtrl.show);
router.put('/posts/:id', postsCtrl.update);
router.delete('/posts/:id', postsCtrl.delete);

module.exports = router