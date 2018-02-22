const express = require("express");
const FlightApiService = require('../services/FlightApiService');

class GetPackageRouter {

    constructor(randomizeService) {
        this.randomizeService = randomizeService;
    }

    // router(){
    //     let router = express.Router();
    //     router.post("/abc",this.post.bind(this));
    //     return router;
    // }

    post(req,res) {
        this.randomizeService.findAvailableDestination()
            .then(() => {
                let flightApiService = new FlightApiService({
                    flyFrom: 'HKG',
                    to: this.randomizeService.pickDestination(),
                    dateFrom: '01/03/2018',
                    dateTo: '01/03/2018',
                    daysInDestinationFrom: 2,
                    daysInDestinationTo: 7,
                    price_to: 2200,
                    maxstopovers: 1,
                    limit: 10,
                    sort: 'price'
                })
                console.log(flightApiService.to);
                return flightApiService.call();
            })
            .then(response => {
                this.recursiveCalling(response);
            })

        // return this.saveService.create(req.body)
        //     .then((data)=>res.json(data))
        //     .catch((err)=>res.status(500).json(err));
    }

    recursiveCalling(response) {
        if (response.apiData == undefined) {
            this.randomizeService.removeDestination(response.flightApiService.to);

            if (this.randomizeService.availableDestination.length == 0) {
                console.log('No fulfilled destination');
            }
            else {
                response.flightApiService.to = this.randomizeService.pickDestination();
                console.log(response.flightApiService.to);
                return response.flightApiService.call()
                    .then(response => {
                        this.recursiveCalling(response);
                    })
            }
        }
        else {
            console.log(response.apiData);
        }
    }

}

module.exports = GetPackageRouter

