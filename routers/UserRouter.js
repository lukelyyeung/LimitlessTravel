const express = require("express");

class UserRouter {

    constructor(userService, saveService) {
        this.userService = userService;
        this.saveService = saveService;
    }

    router() {
        let router = express.Router({ mergeParams: true });
        router.post("/", this.updateUser.bind(this));
        // router.post("/update", this.updatePackage.bind(this));
        router.put("/search", this.addUserPackage.bind(this));
        router.get("/packages", this.getAll.bind(this));
        router.get("/packages/:packageId", this.getHistory.bind(this));
        return router;
    }

    getHistory(req, res) {
        return this.userService.checkPackageHistory(req.params.packageId)
            .then((data) => res.json(data))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    }

    getAll(req, res) {
        // console.log(req.session.passport.user.profile.photos[0].value);
        console.log(req.session.passport.user.profile.provider);
        return this.userService.checkUserPackage(req.session.passport.user.travellist.id)
            .then((data) => res.json(data))
            .catch((err) => res.status(500).json(err));
    }

    addUserPackage(req, res) {
        console.log('adding package')
        // return this.saveService.findOrCreateUserPackage(req.session.passport.user.travellist.id, req.body)
        return this.saveService.findOrCreateUserPackage(3, req.body)
            .then((data) => res.json(data))
            .catch((err) => res.status(500).json(err));
    }

    // updatePackage(req, res) {
    //     return this.userService.updatePackage(req.body)
    //         .then((data) => res.json(data))
    //         .catch((err) => res.status(500).json(err));
    // }

    updateUser(req, res) {
        return this.userService.update(req.params.userId, req.body)
            .then((data) => res.json(data))
            .catch((err) => res.status(500).json(err));
    }
}

module.exports = UserRouter;

