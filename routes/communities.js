const express = require('express');
const router = express.Router();
const multer = require('../config/multer')

const communitiesCtrl = require('../controllers/communities')

const isLoggedIn = require('../middlewares/isLoggedIn')

/* GET communities listing. */
router.post('/:id/images', multer.single('image'), isLoggedIn, 
    communitiesCtrl.upload
)
router.get('/', isLoggedIn, communitiesCtrl.index);
router.get('/new', isLoggedIn, communitiesCtrl.new);
router.post('/', isLoggedIn, communitiesCtrl.create);
router.post('/:id/join', isLoggedIn, communitiesCtrl.join);
router.get('/:id/edit', isLoggedIn, communitiesCtrl.edit);
router.get('/:id', isLoggedIn, communitiesCtrl.show);
router.put('/:id', isLoggedIn, communitiesCtrl.update);
router.delete('/:id', isLoggedIn, communitiesCtrl.delete);

module.exports = router;