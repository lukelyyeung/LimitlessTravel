const FacebookStrategy = require('passport-facebook').Strategy;
// require('dotenv').config(); 

module.exports = (passport, User) => {
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: `/auth/facebook/callback`,
        profileFields: ['id', 'emails', 'displayName']
    }, (accessToken, refreshToken, profile, cb) => {
        User.findOrCreateUser({
            name: profile.displayName,
            email: profile.emails[0].value,
            facebook: profile.id
        }).then((userProfile) => {
            return cb(null, { profile: profile, accessToken: accessToken, travellist: userProfile[0] });
        })
    }))
}