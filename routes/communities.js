const express = require('express');
const router = express.Router();

const communitiesCtrl = require('../controllers/communities')

/* GET communities listing. */
router.get('/', communitiesCtrl.index);
router.post('/', communitiesCtrl.create);
router.post('/:id/join', communitiesCtrl.join);
router.get('/new', communitiesCtrl.new);
router.get('/:id/edit', communitiesCtrl.edit);
router.get('/:id', communitiesCtrl.show);
router.put('/:id', communitiesCtrl.update);
router.delete('/:id', communitiesCtrl.delete);

module.exports = router;