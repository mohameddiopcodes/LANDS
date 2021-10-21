const express = require('express');
const router = express.Router();

const activitiesCtrl = require('../controllers/activities');

const isLoggedIn = require('../middlewares/isLoggedIn')

router.post('/communities/:id/activities', isLoggedIn, activitiesCtrl.create);
router.post('/activities/:id/join', isLoggedIn, activitiesCtrl.join);
router.get('/activities/:id', isLoggedIn, activitiesCtrl.show);
router.put('/activities/:id', isLoggedIn, activitiesCtrl.update);
router.delete('/activities/:id', isLoggedIn, activitiesCtrl.delete);

module.exports = router