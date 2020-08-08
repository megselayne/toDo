const express = require('express');
const authRouter = express.Router();

const passport = require('../services/auth/local');

const authHelpers = require('../services/auth/auth-helpers');

authRouter.get('/login', authHelpers.loginRedirect, (req, res) => {
  res.render('auth/login');
});
authRouter.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/auth/login',
    failureFlash: true,
  })
);
authRouter.get('/logout', (req, res) => {
  req.logout();
  res.redirect('back');
});

module.exports = authRouter;