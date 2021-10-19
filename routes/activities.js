const express = require('express');
const router = express.Router();

const activitiesCtrl = require('../controllers/activities');

router.post('/communities/:id/activities', activitiesCtrl.create);
router.post('/activities/:id/join', activitiesCtrl.join);
router.get('/activities/:id', activitiesCtrl.show);
router.put('/activities/:id', activitiesCtrl.update);
router.delete('/activities/:id', activitiesCtrl.delete);

module.exports = router