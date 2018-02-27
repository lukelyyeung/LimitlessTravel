const HotelApiService = require('../../services/HotelApiService');
const knexFile = require('../../knexfile')['testing'];
const knex = require('knex')(knexFile);

describe('hotelApiService', () => {
    let hotelApiService;
    const testingData = require('./HotelApiTestingData.json');

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

    it('return correct date format for API and correct amount of max_rate', () => {
        hotelApiService.update({
            check_in: '20180301',
            check_out: '20180305',
            max_rate: 500
        })
        expect(hotelApiService.check_in).toEqual('2018-03-01');
        expect(hotelApiService.check_out).toEqual('2018-03-05');
        expect(hotelApiService.max_rate).toEqual(1000);
    });

    it('return correct url', () => {
        hotelApiService.apiKey = 'KEY';
        hotelApiService.radius = 10;
        hotelApiService.check_in = '2018-03-01';
        hotelApiService.check_out = '2018-03-05';
        hotelApiService.max_rate = 500;
        hotelApiService.lat = 34.6937398;
        hotelApiService.long = 135.502182;

        expect(hotelApiService.getUrl()).toEqual('https://api.sandbox.amadeus.com/v1.2/hotels/search-circle?apikey=KEY&latitude=34.6937398&longitude=135.502182&radius=10&check_in=2018-03-01&check_out=2018-03-05&lang=EN&currency=HKD&max_rate=500');
    });

    it('return formatted data for our further implementation', () => {
        let formattedData = hotelApiService.mapData(testingData);
        formattedData.forEach(element => {
            expect(Object.getOwnPropertyNames(element)).toEqual(['property_name','address','price']);
        });
    })
    
})
