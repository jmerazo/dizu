const { Router } = require('express');
const passport = require('passport');
const authRouter = Router();
const isLoggedIn = require('../middlewares/authMiddleware');

authRouter.get('/', (req, res) => {
    res.render('index', {successMessage: req.flash('Success'), errorMessage: req.flash('Error')});
});

authRouter.post('/signup', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/signup',
    failureFlash: true
}));

module.exports = authRouter;