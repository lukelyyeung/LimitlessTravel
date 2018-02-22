const axios = require('axios');

class FlightApiService {

    constructor(options) {
        this.flyFrom = options.flyFrom;
        this.to = options.to;
        this.dateFrom = options.dateFrom;
        this.dateTo = options.dateTo;
        this.daysInDestinationFrom = options.daysInDestinationFrom;
        this.daysInDestinationTo = options.daysInDestinationTo;
        this.partner = 'picky';
        this.partner_market = 'us';
        this.curr = 'HKD';
        this.price_to = options.price_to;
        this.maxstopovers = options.maxstopovers;
        this.limit = options.limit;
        this.sort = options.sort;
    }

    call() {
        this.url = this.getUrl();

        return axios.get(this.url)
            .then(response => {
                return {flightApiService:this, apiData: response.data.data[0]}
            })
            .catch(error => console.log(error));
    }

    getUrl() {
        this.dateFrom = this.dateFrom.replace(/\//g, '%2F');
        this.dateTo = this.dateTo.replace(/\//g, '%2F');

        return `https://api.skypicker.com/flights?flyFrom=${this.flyFrom}&to=${this.to}&dateFrom=${this.dateFrom}&dateTo=${this.dateTo}&daysInDestinationFrom=${this.daysInDestinationFrom}&daysInDestinationTo=${this.daysInDestinationTo}&partner=${this.partner}&partner_market=${this.partner_market}&curr=${this.curr}&price_to=${this.price_to}&maxstopovers=${this.maxstopovers}&limit=${this.limit}&sort=${this.sort}`;
    }

}

module.exports = FlightApiService


