const axios = require('axios');

class FlightAPI {

    constructor(options) {
        this.flyFrom = options.flyFrom;
        this.to = options.to;
        this.dateFrom = options.dateFrom;
        this.dateTo = options.dateTo;
        this.daysInDestinationFrom = options.daysInDestinationFrom;
        this.daysInDestinationTo = options.daysInDestinationTo;
        this.partner = options.partner;
        this.partner_market = options.partner_market;
        this.curr = options.curr;
        this.price_to = options.price_to;
        this.maxstopovers = options.maxstopovers;
        this.limit = options.limit;
    }

    call() {
        this.url = this.getUrl();
        
        axios.get(this.url)
            .then(response => console.log(JSON.stringify(response.data.data[0])))
            .catch(error => console.log(error));
    }

    getUrl() {
        this.dateFrom = this.dateFrom.replace(/\//g, '%2F');
        this.dateTo = this.dateTo.replace(/\//g, '%2F');

        return `https://api.skypicker.com/flights?flyFrom=${this.flyFrom}&to=${this.to}&dateFrom=${this.dateFrom}&dateTo=${this.dateTo}&daysInDestinationFrom=${this.daysInDestinationFrom}&daysInDestinationTo=${this.daysInDestinationTo}&partner=${this.partner}&partner_market=${this.partner_market}&curr=${this.curr}&price_to=${this.price_to}&maxstopovers=1&limit=${this.limit}`;
    }

}

// const flightAPI = new FlightAPI({
//     flyFrom: 'HKG',
//     to: 'TPE',
//     dateFrom: '01/03/2018',
//     dateTo: '01/03/2018',
//     daysInDestinationFrom: 2,
//     daysInDestinationTo: 7,
//     partner: 'picky',
//     partner_market: 'us',
//     curr: 'HKD',
//     price_to: 5000,
//     maxstopovers: 1,
//     limit: 100
// })

// flightAPI.call()
