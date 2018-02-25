const HotelApiService = require('../../services/HotelApiService');
const knexFile = require('../../knexfile')['testing'];
const knex = require('knex')(knexFile);
const _ = require('lodash');

function isArrayEqual(x, y) {
    return _(x).differenceWith(y, _.isEqual).isEmpty();
};

describe('hotelApiService', () => {
    let hotelApiService;
    let testingDestination = ['KIX', 'NRT', 'TPE', 'SFO'];

    beforeEach((done) => {
        hotelApiService = new HotelApiService(knex);
        return knex('travel_spots').del().truncate()
            .then(() => {
                return knex('travel_spots').insert([
                    { airportCode: 'KIX', city: 'Osaka', country: 'Japan', region: 'East Asia', location: { lat: 34.6937398, long: 135.5021820 } },
                    { airportCode: 'NRT', city: 'Tokyo', country: 'Japan', region: 'East Asia', location: { lat: 35.6895266, long: 139.6916809 } },
                    { airportCode: 'TPE', city: 'Taipei', country: 'Taiwan', region: 'East Asia', location: { lat: 25.0476904, long: 121.5168507 } },
                    { airportCode: 'SFO', city: 'San Francisco', country: 'USA', region: 'North America', location: { lat: 37.7749295, long: -122.4194183 } }
                ])
            })
            .then(() => done());
    });

    it('return correct latitude and longitude', (done) => {
        hotelApiService.getLocation('KIX')
            .then(() => {
                expect(hotelApiService.lat).toEqual(34.6937398);
                expect(hotelApiService.long).toEqual(135.502182);
                done();
            })
    });
})
