const moment = require('moment');

class GetPackageService {
    constructor(randomizeService, flightApiService, hotelApiService) {
        this.randomizeService = randomizeService;
        this.flightApiService = flightApiService;
        this.hotelApiService = hotelApiService;
    }

    generate(criteria) {
        let flightData, hotelData, availableDestination;
        let removedDestination = criteria.removed;
        // console.log(removedDestination);

        return this.randomizeService.findAvailableDestination()
            .then((data) => {
                availableDestination = data
                removedDestination.forEach(element => this.randomizeService.removeDestination(element, availableDestination));
                return availableDestination;
            })
            .then(() => this.getFlightData(criteria, availableDestination, removedDestination))
            .then((data) => flightData = data)
            .then(() => this.getHotelData(criteria, flightData))
            .then((data) => hotelData = data)
            .then(() => this.combinePackage(flightData, hotelData, criteria))
            .then((combinePackage) => {
                // console.log(`All: ${availableDestination}`);
                // console.log('ok');
                return [removedDestination, combinePackage]
            })
    }

    getFlightData(criteria, availableDestination, removedDestination) {
        this.flightApiService.update({
            flyFrom: 'HKG',
            to: (!criteria.to) ? this.randomizeService.pickDestination(availableDestination) : criteria.to,
            dateFrom: criteria.dDate,
            dateTo: criteria.dDate,
            returnFrom: criteria.rDate,
            returnTo: criteria.rDate,
            price_to: Math.floor(criteria.budget * 0.7),
            sort: 'quality'
        })
        console.log(`New: ${this.flightApiService.to}`);
        return this.flightApiService.call()
            .then((flightData => this.recursiveFlightApiCall(flightData, availableDestination, removedDestination)))
            .then((flightData) => this.flightApiService.mapData(flightData))
    }

    recursiveFlightApiCall(flightData, availableDestination, removedDestination) {
        removedDestination.push(this.flightApiService.to);
        this.randomizeService.removeDestination(this.flightApiService.to, availableDestination);

        if (flightData.length == 0) {

            if (availableDestination.length == 0) {
                return 'No fulfilled destination';
            }
            else {
                this.flightApiService.to = this.randomizeService.pickDestination(availableDestination);
                console.log(`New: ${this.flightApiService.to}`);
                return this.flightApiService.call()
                    .then(data => this.recursiveFlightApiCall(data, availableDestination, removedDestination))
            }
        }

        else {
            return flightData;
        }
    }

    getHotelData(criteria, flightData) {
        return this.hotelApiService.getLocation(this.flightApiService.to)
            .then(() => {
                this.hotelApiService.update({
                    radius: 9,
                    check_in: criteria.dDate,
                    check_out: criteria.rDate,
                    max_rate: (criteria.budget - flightData[flightData.length - 1].price) / (moment(criteria.rDate).format('YYYYMMDD') - moment(criteria.dDate).format('YYYYMMDD'))
                })
                return this.hotelApiService.call();
            })
            .then((hotelData) => this.hotelApiService.mapData(hotelData))
    }

    combinePackage(flightData, hotelData, criteria) {
        return flightData.map(element => {
            let rObj = {};
            let max = hotelData.length;
            let randomNum = Math.floor(Math.random() * max);

            rObj['effective'] = moment().format('YYYY-MM-DD');
            rObj['departure_date'] = moment(criteria.dDate).format('YYYY-MM-DD');
            rObj['return_date'] = moment(criteria.rDate).format('YYYY-MM-DD');
            rObj['budget'] = criteria.budget;
            rObj['package_price'] = element.price + hotelData[randomNum].price;
            rObj['flight'] = element;
            rObj['accommodation'] = hotelData[randomNum];

            return rObj;
        })
    }

}

module.exports = GetPackageService
