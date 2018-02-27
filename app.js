// General Initialization
require('dotenv').config();
const NODE_ENV = process.env.NODE_ENV || 'development' 

const knexFile = require('./knexfile')['development']
const knex = require('knex')(knexFile)

// const isLoggedIn = require('./utils/guard').isLoggedIn;

const ViewRouter = require('./ViewRouter');

const GetPackageRouter = require('./routers/GetPackageRouter');
const RandomizeService = require('./services/RandomizeService');
const FlightApiService = require('./services/FlightApiService');
const HotelApiService = require('./services/HotelApiService');
const GetPackageService = require('./services/GetPackageService');

let randomizeService = new RandomizeService(knex);
let flightApiService = new FlightApiService({});
let hotelApiService = new HotelApiService(knex);
let getPackageService = new GetPackageService(randomizeService,flightApiService, hotelApiService);

const {app,server} = require('./utils/init-app')();

app.use('/',new ViewRouter().router());
app.use('/users/result', new GetPackageRouter(getPackageService).router());
// app.use('/api/users',isLoggedIn,new UserRouter(getService, saveService).router());

server.listen(8080,()=>{
    console.log("Application started at port:8080");
});