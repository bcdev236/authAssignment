const dotenv = require("dotenv");
dotenv.config();
// const cookieSession = require('cookie-session');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

const GoogleUser = require("./models/googleUser");
const { createToken } = require('./services/jwtService')

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "http://localhost:4000/api/oauth/callback",
            scope: ["profile", "email"],
        },
        async (accessToken, refreshToken, profile, done) => {
            // done(null, profile);
            try {
                // Find or create the user in your database
                let user = await GoogleUser.findOne({ googleId: profile.id });

                if (!user) {
                    user = await GoogleUser.create({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                    });
                }

                const token = createToken(user);
                const userData = {
                    name: user.name,
                    email: user.email,
                    token,
                };

                done(null, userData);
            } catch (err) {
                done(err, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
})