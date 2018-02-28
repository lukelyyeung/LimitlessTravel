const express = require('express');
const passport = require('passport');
const isLoggedIn = require('./utils/guard').isLoggedIn;

module.exports = class ViewRouter {
    constructor() { }
    
    router() {
        const router = express.Router();
        router.get('/', (req, res) => res.render("index"));
        router.get('/login', (req, res) => res.render("login", { layout: 'login' }));
        router.get('/contact', (req, res) => res.render("contact", { layout: 'contact' }));
        router.get('/users', isLoggedIn, (req, res) => res.render("allPackages", this.getPropic(req.session.passport.user, 'lobby')));
        router.get('/users/search', (req, res) => res.render("search"));
        router.get('/users/tracking/:packageId', (req, res) => res.render("tracking", this.getPropic(req.session.passport.user, 'lobby')));
        return router;
    }

    getPropic(socialProfile, layout) {
        let userInfo = {
            userName: socialProfile.travellist.name,
            email: socialProfile.travellist.email,
            profilePic: ''
        }

        userInfo.layout = (layout) ? layout : null;

        switch (socialProfile.profile.provider) {

            case "facebook":
                userInfo.profilePic = `//graph.facebook.com/${socialProfile.profile.id}/picture?type=large`;
                break;

            case "google":
                userInfo.profilePic = socialProfile.profile.photos[0].value.replace('sz=50', 'sz=300');
        }

        return userInfo;
    }
}