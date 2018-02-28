const axios = require('axios');
const moment = require('moment');

class FlightApiService {

    constructor() {
        this.price_to = 0;
        this.partner = 'picky';
        this.partner_market = 'us';
        this.curr = 'HKD';
        this.maxstopovers = 0;
        this.limit = 5;
    }

    update(options) {
        this.flyFrom = options.flyFrom;
        this.to = options.to;
        this.dateFrom = moment(options.dateFrom).format('DD/MM/YYYY');
        this.dateTo = moment(options.dateTo).format('DD/MM/YYYY');
        this.returnFrom = moment(options.returnFrom).format('DD/MM/YYYY');
        this.returnTo = moment(options.returnTo).format('DD/MM/YYYY');
        this.price_to = options.price_to;
        this.sort = options.sort;
    }

    call() {
        this.url = this.getUrl();

        return axios.get(this.url)
            .then(response => {
                return response.data.data;
            })
            .catch(error => console.log(error));
    }

    getUrl() {
        if (this.price_to == 0)
            return `https://api.skypicker.com/flights?flyFrom=${this.flyFrom}&to=${this.to}&dateFrom=${this.dateFrom}&dateTo=${this.dateTo}&returnFrom=${this.returnFrom}&returnTo=${this.returnTo}&partner=${this.partner}&partner_market=${this.partner_market}&curr=${this.curr}&maxstopovers=${this.maxstopovers}&limit=${this.limit}&sort=${this.sort}`;
        else
            return `https://api.skypicker.com/flights?flyFrom=${this.flyFrom}&to=${this.to}&dateFrom=${this.dateFrom}&dateTo=${this.dateTo}&returnFrom=${this.returnFrom}&returnTo=${this.returnTo}&partner=${this.partner}&partner_market=${this.partner_market}&curr=${this.curr}&price_to=${this.price_to}&maxstopovers=${this.maxstopovers}&limit=${this.limit}&sort=${this.sort}`;
    }

    mapData(apiData) {
        let recommendation = apiData.map(element => {
            let { cityFrom, cityTo, flyFrom, flyTo, price, route, deep_link } = element;
            let flightDetails = route.map(obj => {
                let rObj = {};
                rObj['cityFrom'] = obj.cityFrom;
                rObj['cityTo'] = obj.cityTo;
                rObj['flyFrom'] = obj.flyFrom;
                rObj['flyTo'] = obj.flyTo;
                rObj['dTimeUTC'] = obj.dTimeUTC;
                rObj['aTimeUTC'] = obj.aTimeUTC;
                rObj['airline'] = obj.airline;
                rObj['flight_no'] = obj.flight_no;
                return rObj;
            })

            let singleData = {
                cityFrom: cityFrom,
                cityTo: cityTo,
                flyFrom: flyFrom,
                flyTo: flyTo,
                price: Math.round(price),
                flightDetails: flightDetails,
                deep_link: deep_link
            };

            return singleData;
        });

        return recommendation;
    }
}

module.exports = FlightApiService


