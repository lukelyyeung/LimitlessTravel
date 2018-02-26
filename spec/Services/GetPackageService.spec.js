const GetPackageService = require('../../services/GetPackageService');
const FlightApiService = require('../../services/FlightApiService');
const HotelApiService = require('../../services/HotelApiService');
const RandomizeService = require('../../services/RandomizeService');

const knexFile = require('../../knexfile')['testing'];
const knex = require('knex')(knexFile);

describe('getPackageService', () => {
    let getPackageService, flightApiService, hotelApiService, randomizeService;
    let criteria;

    beforeEach((done) => {
        flightApiService = jasmine.createSpyObj("flightApiService", {
            update: 1,
            call: Promise.resolve('dummy data'),
            mapData: 1
        })

        hotelApiService = jasmine.createSpyObj("flightApiService", {
            getLocation: Promise.resolve([1]),
            update: 1,
            call: Promise.resolve([1]),
            mapData: 1
        })

        randomizeService = new RandomizeService(knex);

        getPackageService = new GetPackageService(randomizeService, flightApiService, hotelApiService);

        getPackageService.flightData = [{
            "cityFrom": "Hong Kong",
            "cityTo": "Taipei",
            "flyFrom": "HKG",
            "flyTo": "TPE",
            "price": 2000,
            "flightDetails": [],
            "deep_link": ""
        }]

        getPackageService.hotelData = [{
            "property_name": "San Want Hotel Taipei",
            "address": {
                "line1": "No172 Zhongxiao Sec 4",
                "city": "Taipei",
                "postal_code": "10688",
                "country": "TW"
            },
            "price": 2000
        }]

        criteria = {
            dDate: '20180301',
            rDate: '20180305',
            budget: 8000
        }

        done();
    });

    it('should not call flight API recursively but return the data if data is returned' , () => {
        expect(getPackageService.recursiveFlightApiCall(getPackageService.flightData)).toEqual(getPackageService.flightData);
    })

    it('should call flight API recursively if no data is returned from availableDestination', (done) => {
        spyOn(getPackageService,'recursiveFlightApiCall').and.callThrough();
        
        randomizeService.availableDestination.length = 5;
        getPackageService.recursiveFlightApiCall([]).then(() => {
            expect(flightApiService.call).toHaveBeenCalled();
            expect(getPackageService.recursiveFlightApiCall).toHaveBeenCalledWith('dummy data');
            done();
        })
    })

    it('should run hotelApiService method successfully', (done) => {
        getPackageService.getHotelData(criteria).then(() => {
            expect(hotelApiService.getLocation).toHaveBeenCalled();
            expect(hotelApiService.update).toHaveBeenCalledWith({ radius: 9, check_in: '20180301', check_out: '20180305', max_rate: 1500 });
            expect(hotelApiService.call).toHaveBeenCalled();
            expect(hotelApiService.mapData).toHaveBeenCalled();
            done();
        })
    })

    it('should combine flightData & hotelData', () => {
        let combinedData = getPackageService.combinePackage(criteria);
        combinedData.forEach(element => {
            expect(Object.getOwnPropertyNames(element)).toEqual(['effective','departure_date','return_date','budget','package_price','flight','accommodation']);
        })
    })
})
