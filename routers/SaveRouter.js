const express = require("express");

class SaveRouter {

    constructor(saveService) {
        this.saveService = saveService;
    }

    router() {
        let router = express.Router({ mergeParams: true });
        router.post("/", this.addUserPackage.bind(this));
        return router;
    }

    addUserPackage(req, res) {
        console.log('adding package');
        // return this.saveService.findOrCreateUserPackage(req.session.passport.user.travellist.id, req.body)
        return this.saveService.findOrCreateUserPackage(3, req.body)
            .then((data) => res.json(data))
            .catch((err) => res.status(500).json(err));
    }

}
module.exports = SaveRouter;

