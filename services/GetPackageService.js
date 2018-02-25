class GetPackageService {
    constructor(randomizeService, flightApiService, hotelApiService) {
        this.randomizeService = randomizeService;
        this.flightApiService = flightApiService;
        this.hotelApiService = hotelApiService;
    }

    list(req) {
        return this.getFlightData(this.flightApiService, this.randomizeService, req, {
            flyFrom: 'HKG',
            dateFrom: '01/03/2018',
            dateTo: '01/03/2018',
            returnFrom: '05/03/2018',
            returnTo: '05/03/2018',
            sort: 'quality'
        })
            .then((flightData) => this.flightData = this.flightApiService.mapData(flightData))
            .then(() => this.getHotelData(this.hotelApiService, {
                destination: this.flightApiService.to,
                radius: 9,
                check_in: '2018-03-01',
                check_out: '2018-03-05',
                max_rate: 500
            }))
            .then((hotelData) => this.hotelData = this.hotelApiService.mapData(hotelData))
            .then(() => this.combinePackage(this.flightData, this.hotelData))
    }

    getFlightData(flightApiService, randomizeService, req, options) {
        return randomizeService.findAvailableDestination()
            .then(() => {
                flightApiService.update({
                    flyFrom: options.flyFrom,
                    to: randomizeService.pickDestination(),
                    dateFrom: options.dateFrom,
                    dateTo: options.dateTo,
                    returnFrom: options.returnFrom,
                    returnTo: options.returnTo,
                    price_to: req.budget,
                    sort: options.sort
                })
                console.log(flightApiService.to);
                return flightApiService.call();
            })
            .then((apiData => this.recursiveFlightApiCall(apiData)))
    }

    recursiveFlightApiCall(flightData) {
        if (flightData.length == 0) {
            this.randomizeService.removeDestination(this.flightApiService.to);

            if (this.randomizeService.availableDestination.length == 0) {
                return 'No fulfilled destination';
            }
            else {
                this.flightApiService.to = this.randomizeService.pickDestination();
                console.log(this.flightApiService.to);
                return this.flightApiService.call()
                    .then(data => this.recursiveFlightApiCall(data))
            }
        }

        else {
            return flightData;
        }
    }

    getHotelData(hotelApiService, options) {
        return hotelApiService.getLocation(options.destination)
            .then(() => {
                hotelApiService.update({
                    radius: options.radius,
                    check_in: options.check_in,
                    check_out: options.check_out,
                    max_rate: 500
                })
                return hotelApiService.call();
            })
    }

    combinePackage(flightData, hotelData) {
        return flightData.map(element => {
            let rObj = {};
            rObj['flight'] = element;
            rObj['accommodation'] = hotelData[0];
            return rObj;
        });
    }

}

module.exports = GetPackageService
