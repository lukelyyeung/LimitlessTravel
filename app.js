// General Initialization
require('dotenv').config();
const NODE_ENV = process.env.NODE_ENV || 'development'

const knexFile = require('./knexfile')['development']
const knex = require('knex')(knexFile)

const isLoggedIn = require('./utils/guard').isLoggedIn;

const ViewRouter = require('./ViewRouter');
const UserRouter = require('./routers/UserRouter');
const AuthRouter = require('./routers/AuthRouter');
const SaveRouter = require('./routers/SaveRouter');
const GetPackageRouter = require('./routers/GetPackageRouter');

const {
    UserService,
    SaveService,
    DailyUpdateService,
    RandomizeService,
    FlightApiService,
    HotelApiService,
    GetPackageService
} = require('./services/ServiceTable');

const userService = new UserService(knex);
const saveService = new SaveService(knex);
const flightApiService = new FlightApiService({});
const hotelApiService = new HotelApiService(knex);
const randomizeService = new RandomizeService(knex);
const getPackageService = new GetPackageService(randomizeService, flightApiService, hotelApiService);
const dailyUpdateService = new DailyUpdateService(knex, saveService, getPackageService);


const { app, server } = require('./utils/init-app')();
require('./utils/init-passport')(app, knex);
require('./utils/init-dailyUpdate')(dailyUpdateService, '2018-03-03T00:00:00', 4320000);

app.use('/', new ViewRouter().router());
app.use('/auth', new AuthRouter().router());
app.use('/users/data', isLoggedIn, new UserRouter(userService).router());
// app.use('/users/data', new UserRouter(userService).router());
app.use('/users/save', new SaveRouter(saveService).router());
app.use('/users/result', new GetPackageRouter(getPackageService).router());

server.listen(8080, () => {
    console.log("Application started at port:8080");
});