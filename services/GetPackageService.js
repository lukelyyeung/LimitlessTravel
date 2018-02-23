class GetPackageService {
    constructor(randomizeService, flightApiService) {
        this.randomizeService = randomizeService;
        this.flightApiService = flightApiService;
    }

    list(data) {
        return this.randomizeService.findAvailableDestination()
            .then(() => {
                this.flightApiService.update({
                    flyFrom: 'HKG',
                    to: this.randomizeService.pickDestination(),
                    dateFrom: '01/03/2018',
                    dateTo: '01/03/2018',
                    returnTo: '05/03/2018',
                    returnFrom: '05/03/2018',
                    price_to: data.budget,
                    sort: 'quality'
                })
                console.log(this.flightApiService.to);
                return this.flightApiService.call();
            })
            .then(apiData => this.recursiveCall(apiData))
    }

    recursiveCall(apiData) {
        if (apiData == undefined) {
            this.randomizeService.removeDestination(this.flightApiService.to);

            if (this.randomizeService.availableDestination.length == 0) {
                return 'No fulfilled destination';
            }
            else {
                this.flightApiService.to = this.randomizeService.pickDestination();
                console.log(this.flightApiService.to);
                return this.flightApiService.call()
                    .then(apiData => {
                        this.getApiData(apiData);
                    })
            }
        }

        else {
            return this.flightApiService.mapData(apiData);
        }
    }

}

module.exports = GetPackageService
