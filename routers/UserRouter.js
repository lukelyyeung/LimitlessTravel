const express = require("express");

class UserRouter {

    constructor(userService) {
        this.userService = userService;
    }

    router() {
        let router = express.Router({ mergeParams: true });
        router.post("/", this.updateUser.bind(this));
        router.get("/packages", this.getAll.bind(this));
        router.put("/packages/:packageId", this.getHistory.bind(this));
        return router;
    }

    getHistory(req, res) {
        console.log(req.body.operater);
        return this.userService.checkPackageHistory(req.params.packageId, req.body.operater)
            .then((data) => res.json(data))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    }

    getAll(req, res) {
        return this.userService.checkUserPackage(req.session.passport.user.travellist.id)
            .then((data) => res.json(data))
            .catch((err) => res.status(500).json(err));
    }

    updateUser(req, res) {
        return this.userService.update(req.params.userId, req.body)
            .then((data) => res.json(data))
            .catch((err) => res.status(500).json(err));
    }
}

module.exports = UserRouter;

