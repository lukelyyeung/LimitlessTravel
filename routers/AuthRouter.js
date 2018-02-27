const passport = require('passport');
const express = require('express');

class AuthRouter {

    // constructor() { }
    router() {
        let authRouter = express.Router({ mergeParams: true });

        authRouter.get('/google', passport.authenticate('google', {
            scope: ['profile', 'email']
        }));

        authRouter.get('/facebook', passport.authenticate('facebook', {
            scope: ['email']
        }));

        authRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
            res.redirect('/users');
            // res.redirect(`/${req.body.id}`);
        });

        authRouter.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), function(req, res) {
            res.redirect('/users');
            // res.redirect(`/${req.body.id}`);
        });

        return authRouter;
    }
}

module.exports = AuthRouter;