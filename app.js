// General Initialization
require('dotenv').config();
const NODE_ENV = process.env.NODE_ENV || 'development'

const knexFile = require('./knexfile')['development']
const knex = require('knex')(knexFile)

const isLoggedIn = require('./utils/guard').isLoggedIn;

const ViewRouter = require('./ViewRouter');

const UserRouter = require('./routers/UserRouter');
const AuthRouter = require('./routers/AuthRouter');
// console.log(new AuthRouter());

const {
    UserService,
    SaveService
} = require('./services/ServiceTable');

const userService = new UserService(knex);
const saveService = new SaveService(knex);
const GetPackageRouter = require('./routers/GetPackageRouter');
const RandomizeService = require('./services/RandomizeService');
const FlightApiService = require('./services/FlightApiService');
const HotelApiService = require('./services/HotelApiService');
const GetPackageService = require('./services/GetPackageService');

let randomizeService = new RandomizeService(knex);
let flightApiService = new FlightApiService({});
let hotelApiService = new HotelApiService(knex);
let getPackageService = new GetPackageService(randomizeService,flightApiService, hotelApiService);

const { app, server } = require('./utils/init-app')();
require('./utils/init-passport')(app, knex);

app.use('/', new ViewRouter().router());
app.use('/auth', new AuthRouter().router());
// app.use('/users/data', isLoggedIn, new UserRouter(userService, saveService).router());
app.use('/users/data', new UserRouter(userService, saveService).router());
app.use('/users/result', new GetPackageRouter(getPackageService).router());

server.listen(8080, () => {
    console.log("Application started at port:8080");
});