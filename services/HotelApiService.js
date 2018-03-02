require('dotenv').config({path: '../.env'});

const axios = require('axios');
const moment = require('moment');

class HotelApiService {

    constructor(knex) {
        this.knex = knex;
        this.apiKey = process.env.HOTEL_APIKEY;
        this.currency = 'HKD';
    }

    getLocation(destination) {
        return this.knex.select('location')
            .from('travel_spots')
            .where('airportCode', destination)
            .then(data => {
                this.lat = data[0].location.lat;
                this.long = data[0].location.long;
            })
            .catch(err => {
                console.log(err);
                return false;
            })
    }

    update(options) {
        this.radius = options.radius;
        this.check_in = moment(options.check_in).format('YYYY-MM-DD');
        this.check_out = moment(options.check_out).format('YYYY-MM-DD');
        this.max_rate = options.max_rate * 3;
    }

    call() {
        this.url = this.getUrl();

        return axios.get(this.url)
            .then(response => {
                return response.data.results;
            })
            .catch(error => console.log(error));
    }

    getUrl() {
        return `https://api.sandbox.amadeus.com/v1.2/hotels/search-circle?apikey=${this.apiKey}&latitude=${this.lat}&longitude=${this.long}&radius=${this.radius}&check_in=${this.check_in}&check_out=${this.check_out}&lang=EN&currency=${this.currency}&max_rate=${this.max_rate}`;
    }

    mapData(apiData) {
        let recommendation = apiData.map(obj => {
            let rObj = {};
            rObj['property_name'] = obj.property_name;
            rObj['address'] = obj.address;
            rObj['price'] = Math.round(obj.total_price.amount / 3);
            return rObj;
        })

        return recommendation;
    }
}

module.exports = HotelApiService

// let a = new HotelApiService({});
// console.log(a.mapData(data))
