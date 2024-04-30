const express = require('express');
var router = express.Router();
const passport = require('../controllers/auth')

router.post('/login', passport.authenticate('local', {
  successReturnToOrRedirect: '/dashboard',
  failureRedirect: '/',
  failureMessage: 'Usuario o contraseña incorrecta'
}));

router.post('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/', { csrfToken: req.csrfToken() });
  });
});

module.exports = router;