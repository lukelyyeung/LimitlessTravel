const knexFile = require('../../knexfile')['development'];
const knex = require('knex')(knexFile);
const {
    FlightService,
    AccomodationService,
    UserService,
    PackageService
} = require('./knexServiceTable');

const flightService = new FlightService(knex);
const accomodationService = new AccomodationService(knex);
const userService = new UserService(knex);
const packageService = new PackageService(knex, FlightService, AccomodationService);

const wholePackage = {
    day_from: '2010-04-25',
    day_to: '2010-05-06',
    city_from: 'New York',
    city_to: 'Japan',
    airline_id: 'CX',
    flight_code: '789',
    airport_from: 'HKG',
    airport_to: 'KIX',
    flight_price: 2439.8,
    hotel_name: 'Big Osaka Hotel',
    hotel_city: 'Japan',
    location: {
        lat: 10100.10,
        long: 69500.9
    },
    hotel_price: 6200,
    effect_date: '2018-02-21'
}
    // return packageService.checkUserPackage(2, 'desc')
    // return packageService.checkPackageHistory(4, 'asc')
    return packageService.findOrCreateUserPackage(2, wholePackage)
    // return packageService.updatePackage(wholePackage)
    // return accomodationService.addbookings(2, wholePackage)
    // return accomodationService.findOrCreateHotel(wholePackage)
    // .then((data => {
        // console.log(data);
        // }))
        // data.forEach(day => {
            // let { city_to, city_from, effect_date, hotel_price, flight_price } = day;
            // console.log(`The hotel price is ${hotel_price} and the flight_price is ${flight_price} on ${effect_date} from ${city_from} to ${city_to}.`);
        // });
    // }))
    .then((data) => {
        console.log('created room with ', data);
    })
    .catch(console.log)
