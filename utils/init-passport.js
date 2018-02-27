const passport = require('passport')
const User = require('./User')


module.exports = (app, knex)=>{
    const user = new User(knex);
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user,done)=>{
        done(null,user);
    });

    passport.deserializeUser((user,done)=>{
        done(null,user);
    });

    require('./strategies/facebook-strategy')(passport, user);
    require('./strategies/google-strategy')(passport, user);
}