const dotenv = require("dotenv");
const cookieSession = require('cookie-session');

const GoogleStrategy = require('passport-goole-oauth20').Strategy;
const passport = require('passport');

passport.use(
    new GoogleStrategy(
        
    )
)