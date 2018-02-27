function isLoggedIn(req, res, next) {
    // console.log(req.isAuthenticated());
    // console.log(req.session);
    // if (req.isAuthenticated() && req.session.passport.profile.id === req.params.userId) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = {
    isLoggedIn: isLoggedIn,
}