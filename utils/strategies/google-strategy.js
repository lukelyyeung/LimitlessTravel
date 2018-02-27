const GoogleStrategy = require('passport-google-oauth20').Strategy;
// require('dotenv').config(); 

module.exports = (passport, User) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `/auth/google/callback`,
    }, (accessToken, refreshToken, profile, email, done) => {
            User.findOrCreateUser({
                name: email.displayName,
                email: email.emails[0].value,
                google: email.id
            }).then((userProfile) => {
                return done(null, { profile: email, accessToken: accessToken, travellist: userProfile[0] });
            })
        // })
    }))
}
