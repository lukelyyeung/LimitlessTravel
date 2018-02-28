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
        router.get('/users', isLoggedIn, (req, res) => res.render("allPackages", {
            userName: req.session.passport.user.travellist.name,
            email: req.session.passport.user.travellist.email,
            profilePic: this.getPropic(req.session.passport.user.profile),
            layout: 'lobby'
        }));
        router.get('/users/search', (req, res) => res.render("search", { layout: 'searchLayout' }));
        return router;
    }

    getPropic(socialProfile) {
        switch (socialProfile.provider) {

            case "facebook":
                return `//graph.facebook.com/${socialProfile.id}/picture?type=large`;
                break;

            case "google":
                return socialProfile.photos[0].value.replace('sz=50', 'sz=300');
        }
    }
}