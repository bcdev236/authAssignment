const express = require("express");
const router = express.Router();
const passport = require('passport');
const dotenv = require("dotenv");
dotenv.config();

router.get('/login/success', (req, res) => {
    // if(req.user) {
    //     res.status(200).json({user: req.user});
    // } else{
    //     res.status(403).json({message: "Not Authenticated"});
    // }
    if (req.session && req.session.user) {
        res.status(200).json({
            user: req.session.user, // Include email, token, etc.
        });
    } else {
        res.status(401).json({
            message: 'User not logged in',
        });
    }
});

router.get('/login/failed', (req, res) => {
    res.status(401).json({message: "Login with google failed"});
});

router.get('/callback',
    passport.authenticate('google', {
        session: false,
        failureRedirect: '/api/oauth/login/failed',
    }),
    (req, res) => {
        // const user = req.user;
        req.session.user = req.user;
        res.redirect(process.env.CLIENT_URL);
        // res.status(200).json({
        //     message: "Login successful",
        //     user
        // });
    }
);

router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.session.destroy((err) => {
            if (err) {
                return next(err);
            }
            res.clearCookie('connect.sid');
            res.redirect(process.env.CLIENT_URL);
        });
    });
});

module.exports = router;