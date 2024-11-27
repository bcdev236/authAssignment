const GoogleUser = require('../models/googleUser')

const getGoogleUser = async (profile_id) => {
    const user = await GoogleUser.findOne({ googleId: profile_id });
    return user;
}

const createGoogleUser = async (profile) => {
    const user = await GoogleUser.create({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
    });
    return user;
}

module.exports = {
    getGoogleUser,
    createGoogleUser
}