const express = require("express");

class GetPackageRouter{

    constructor(randomizeService, flightApiService){
        this.randomizeService = randomizeService;
        this.flightApiService = flightApiService;
    }

    router(){
        let router = express.Router();
        router.post("/abc",this.post.bind(this));
        return router;
    }

    post(req,res){
        this.randomizeService.findAvailableDestination();

        let flightAPI = new FlightAPI({
            flyFrom: 'HKG',
            to: this.randomizeService.pickDestination(),
            dateFrom: '01/03/2018',
            dateTo: '01/03/2018',
            daysInDestinationFrom: 2,
            daysInDestinationTo: 7,
            partner: 'picky',
            partner_market: 'us',
            curr: 'HKD',
            price_to: 5000,
            maxstopovers: 1,
            limit: 100
        })



        return this.saveService.create(req.body)
            .then((data)=>res.json(data))
            .catch((err)=>res.status(500).json(err));
    }

}

module.exports = GetPackageRouter

