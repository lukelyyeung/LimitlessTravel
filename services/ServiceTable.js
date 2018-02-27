const UserService = require('./UserService');
const SaveService = require('./SaveService');
const HotelApiService = require('./HotelApiService');
const FlightApiService = require('./FlightApiService');
const RandomizeService = require('./RandomizeService');
const GetPackageService = require('./GetPackageService');
const DailyUpdateService = require('./DailyUpdateService');


module.exports = {
    UserService: UserService,
    SaveService: SaveService,
    HotelApiService: HotelApiService,
    FlightApiService: FlightApiService,
    RandomizeService: RandomizeService,
    GetPackageService: GetPackageService,
    DailyUpdateService: DailyUpdateService
}