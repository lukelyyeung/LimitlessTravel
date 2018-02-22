const RandomizeService = require('../../services/RandomizeService');
const knexFile = require('../../knexfile')['testing'];
const knex = require('knex')(knexFile);
const _ = require('lodash');

function isArrayEqual(x, y) {
    return _(x).differenceWith(y, _.isEqual).isEmpty();
};

describe('randomizeService', () => {
    let randomizeService;
    let testingDestination = ['KIX', 'RGN', 'BLR', 'HAM', 'SFO'];

    beforeEach((done) => {
        randomizeService = new RandomizeService(knex);
        return knex('travel_spots').del().truncate()
            .then(() => {
                return knex('travel_spots').insert([
                    { airportCode: 'KIX', city: 'Osaka', country: 'Japan', region: 'East Asia' },
                    { airportCode: 'RGN', city: 'Yangon', country: 'Myanmar', region: 'South East Asia' },
                    { airportCode: 'BLR', city: 'Bangalore', country: 'India', region: 'Middle East' },
                    { airportCode: 'HAM', city: 'Hamburg', country: 'Germany', region: 'Europe' },
                    { airportCode: 'SFO', city: 'San Francisco', country: 'USA', region: 'North America' },
                ])
            })
            .then(() => done());
    });

    it("should retrieve all destination from predinfined destination", (done) => {
        randomizeService.findAvailableDestination()
            .then(data => {
                let availableDestination = data.map(x => x.airportCode)
                expect(isArrayEqual(availableDestination, testingDestination)).toBe(true);
                done();
            })
    });

    it ('should return false when if there is no available destination', () => {
        randomizeService.availableDestination = [];
        expect(randomizeService.pickDestination()).toBe(false);
    })

    it("should remove the suggested destination when it's out of the buget", () => {
        let destination = 'RGN', price = 4000, budget = 3000;
        randomizeService.availableDestination = ['KIX', 'RGN', 'BLR', 'HAM', 'SFO'];

        expect(randomizeService.validateBudget(destination, price, budget)).toEqual(0);
        expect(isArrayEqual(randomizeService.availableDestination, ['KIX', 'BLR', 'HAM', 'SFO'])).toBe(true);
    });

    it("should pass the price validation when it's within the buget", () => {
        let destination = 'RGN', price = 4000, budget = 5000;
        randomizeService.availableDestination = ['KIX', 'RGN', 'BLR', 'HAM', 'SFO'];

        randomizeService.validateBudget(destination, price, budget);
        expect(isArrayEqual(randomizeService.availableDestination, testingDestination)).toBe(true);
    });

    it('test', () => {
    })
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