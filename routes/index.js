const express = require('express');
const router = express.Router();
const passport = require('passport')

const isLoggedIn = require('../middlewares/isLoggedIn');
const User = require('../models/User');

router.post('/upload', function(req, res) {
  console.log(req.files.image)
  res.redirect('/')
})

/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
  res.render('index');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', async function(req, res, next) {
  try {
    const user = await User.logIn(req.body.email.trim(), req.body.password)
    if(user) {
      // passport.serializeUser(function(u, next) {
      //   next(null, user._id)
      // })
      res.redirect('/')
    }
  } catch(error) {
    res.redirect('/login')
  }
})

router.get('/signup', function(req, res, next) {
  res.render('signup');
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
