const express = require('express');
const router = express.Router();
const passport = require('passport')

const isLoggedIn = require('../middlewares/isLoggedIn')

/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
  res.render('index');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/logout', function(req, res) {
  req.session.destroy(function (err) {
    res.redirect('/login');
  });
})

router.get('/auth/google', 
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  //succesful auth
  function(req, res) {
    res.redirect('/');
  }
)

module.exports = router;
