const FlightApiService = require('../../services/FlightApiService');

describe('flightApiService', () => {
    let flightApiService;
    const testingData = require('./FlightApiTestingData.json');

    beforeEach(() => {
        flightApiService = new FlightApiService();
    });

    it('return correct date format for API', () => {
        flightApiService.update({
            dateFrom: '20180301',
            dateTo: '20180301',
            returnFrom: '20180305',
            returnTo: '20180305'
        })
        expect(flightApiService.dateFrom).toEqual('01/03/2018');
        expect(flightApiService.dateTo).toEqual('01/03/2018');
        expect(flightApiService.returnFrom).toEqual('05/03/2018');
        expect(flightApiService.returnTo).toEqual('05/03/2018');
    });

    it('return correct url with price constraint', () => {
        flightApiService.flyFrom = 'HKG';
        flightApiService.to = 'KIX';
        flightApiService.dateFrom = '01/03/2018';
        flightApiService.dateTo = '01/03/2018';
        flightApiService.returnFrom = '05/03/2018';
        flightApiService.returnTo = '05/03/2018';
        flightApiService.price_to = 5000;
        flightApiService.sort = 'quality';

        expect(flightApiService.getUrl()).toEqual('https://api.skypicker.com/flights?flyFrom=HKG&to=KIX&dateFrom=01/03/2018&dateTo=01/03/2018&returnFrom=05/03/2018&returnTo=05/03/2018&partner=picky&partner_market=us&curr=HKD&price_to=5000&maxstopovers=1&limit=5&sort=quality');
    });

    it('return formatted data for our further implementation', () => {
        let formattedData = flightApiService.mapData(testingData.data);
        formattedData.forEach(element => {
            expect(Object.getOwnPropertyNames(element)).toEqual(['cityFrom','cityTo','flyFrom','flyTo','price','flightDetails','deep_link']);
        });
    })
})
