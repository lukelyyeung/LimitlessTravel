const RandomizeService = require('../../services/RandomizeService');
const knexFile = require('../../knexfile')['testing'];
const knex = require('knex')(knexFile);
const _ = require('lodash');

function isArrayEqual(x, y) {
    return _(x).differenceWith(y, _.isEqual).isEmpty();
};

describe('randomizeService', () => {
    let randomizeService;
    let testingDestination = ['KIX', 'NRT', 'TPE', 'SFO'];

    beforeEach((done) => {
        randomizeService = new RandomizeService(knex);
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

    it("should retrieve all destination from predinfined destination", (done) => {
        randomizeService.findAvailableDestination()
            .then(data => {
                let availableDestination = data;
                expect(isArrayEqual(availableDestination, testingDestination)).toBe(true);
                done();
            })
    });

    it('should return false when if there is no available destination', () => {
        randomizeService.availableDestination = [];
        expect(randomizeService.pickDestination()).toBe(false);
    })

    it('should remove the given destination', () => {
        randomizeService.availableDestination = ['KIX', 'RGN', 'BLR', 'HAM', 'SFO'];
        randomizeService.removeDestination('RGN');
        expect(isArrayEqual(randomizeService.availableDestination, ['KIX', 'BLR', 'HAM', 'SFO'])).toBe(true);
    });

    it('should remove nothing and return false if the given destination is not on the available destination', () => {
        randomizeService.availableDestination = ['KIX', 'RGN', 'BLR', 'HAM', 'SFO'];
        expect(randomizeService.removeDestination('PEK')).toBe(false);
        expect(isArrayEqual(randomizeService.availableDestination, ['KIX', 'RGN', 'BLR', 'HAM', 'SFO'])).toBe(true);
    });
})

// Integration Test
// it("should pick a random destination if findAvailableDestination() is called before", (done) => {
//     randomizeService.findAvailableDestination()
//         .then(() => {
//             return randomizeService.findDestination()
//         })
//         .then(data => {
//             console.log(data)
//             done();
//         })
// });

// it ('should return false if no findAvailableDestination() is called before', () => {
//     expect(randomizeService.pickDestination()).toBe(false);
// })