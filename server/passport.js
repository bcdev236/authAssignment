const dotenv = require("dotenv");
dotenv.config();

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

const GoogleUser = require("./models/googleUser");
const { createToken } = require('./services/jwtService');

const { getGoogleUser,createGoogleUser } = require('./services/oAuth')

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: `${process.env.SERVER_URL}api/oauth/callback`,
            scope: ["profile", "email"],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await getGoogleUser(profile.id);
                if (!user) {
                    user = await createGoogleUser(profile);
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