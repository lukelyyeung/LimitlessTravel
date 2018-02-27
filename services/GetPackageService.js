const moment = require('moment');

class GetPackageService {
    constructor(randomizeService, flightApiService, hotelApiService) {
        this.randomizeService = randomizeService;
        this.flightApiService = flightApiService;
        this.hotelApiService = hotelApiService;
        this.flightData = [];
        this.hotelData = [];
        this.packageData = [];
    }

    generate(criteria) {
        return this.randomizeService.findAvailableDestination()
            .then(() => {
                criteria.destination.forEach(element => this.randomizeService.removeDestination(element));
                return this.getFlightData(criteria)
                    .then(() => this.getHotelData(criteria))
                    .then(() => this.combinePackage(criteria))
                    .then((combinePackage) => [this.flightApiService.to, combinePackage])
            })
    }

    getFlightData(criteria) {
        this.flightApiService.update({
            flyFrom: 'HKG',
            to: (typeof criteria.to === 'undefined') ? this.randomizeService.pickDestination() : criteria.to,
            dateFrom: criteria.dDate,
            dateTo: criteria.dDate,
            returnFrom: criteria.rDate,
            returnTo: criteria.rDate,
            price_to: criteria.budget * 0.7,
            sort: 'quality'
        })
        console.log(this.flightApiService.to);
        return this.flightApiService.call()
            .then((apiData => this.recursiveFlightApiCall(apiData)))
            .then((flightData) => { this.flightData = this.flightApiService.mapData(flightData) })
    }

    recursiveFlightApiCall(flightData) {
        this.randomizeService.removeDestination(this.flightApiService.to);

        if (flightData.length == 0) {

            if (this.randomizeService.availableDestination.length == 0) {
                return 'No fulfilled destination';
            }
            else {
                this.flightApiService.to = this.randomizeService.pickDestination();
                // console.log(this.flightApiService.to);
                return this.flightApiService.call()
                    .then(data => this.recursiveFlightApiCall(data))
            }
        }

        else {
            return flightData;
        }
    }

    getHotelData(criteria) {
        return this.hotelApiService.getLocation(this.flightApiService.to)
            .then(() => {
                this.hotelApiService.update({
                    radius: 9,
                    check_in: criteria.dDate,
                    check_out: criteria.rDate,
                    max_rate: (criteria.budget - this.flightData[this.flightData.length - 1].price) / (criteria.rDate - criteria.dDate)
                })
                return this.hotelApiService.call();
            })
            .then((hotelData) => this.hotelData = this.hotelApiService.mapData(hotelData))
    }

    combinePackage(criteria) {
        return this.flightData.map(element => {
            let rObj = {};
            let max = this.hotelData.length;
            let randomNum = Math.floor(Math.random() * max);

            rObj['effective'] = moment().format('YYYY-MM-DD');
            rObj['departure_date'] = moment(criteria.dDate).format('YYYY-MM-DD');
            rObj['return_date'] = moment(criteria.rDate).format('YYYY-MM-DD');
            rObj['budget'] = criteria.budget;
            rObj['package_price'] = element.price + this.hotelData[randomNum].price;
            rObj['flight'] = element;
            rObj['accommodation'] = this.hotelData[randomNum];

            return rObj;
        })
    }

}

module.exports = GetPackageService
