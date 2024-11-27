const express = require("express");
const router = express.Router();
const passport = require('passport');
const dotenv = require("dotenv");
dotenv.config();

const {handleLoginSuccess, handleLoginFailed, handleLogout} = require('../controllers/oAuth')

router.get('/login/success', (req, res) => {
    return handleLoginSuccess(req, res);
});

router.get('/login/failed', (req, res) => {
    return handleLoginFailed(req, res);
});

router.get('/callback',
    passport.authenticate('google', {
        // session: false,
        failureRedirect: '/api/oauth/login/failed',
    }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect(process.env.CLIENT_URL);
    }
);

router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

router.get('/logout', (req, res, next) => {
    return handleLogout(req, res, next);
});

module.exports = router;