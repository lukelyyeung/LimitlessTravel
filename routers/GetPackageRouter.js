const express = require("express");

class GetPackageRouter {

    constructor(getPackageService) {
        this.getPackageService = getPackageService;
    }

    router() {
        let router = express.Router();
        router.post("/", this.post.bind(this));
        return router;
    }

    post(req, res) {
        return this.getPackageService.list(req.body)
            .then((data) => res.json(data))
            .catch((err) => res.json(err));
    }
}

module.exports = GetPackageRouter

