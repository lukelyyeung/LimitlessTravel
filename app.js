// General Initialization
require('dotenv').config();
const NODE_ENV = process.env.NODE_ENV || 'development' 

const knexFile = require('./knexfile')['development']
const knex = require('knex')(knexFile)

// const isLoggedIn = require('./utils/guard').isLoggedIn;

const ViewRouter = require('./ViewRouter');

const GetPackageRouter = require('./routers/GetPackageRouter');
const RandomizeService = require('./services/RandomizeService');

let randomizeService = new RandomizeService(knex);

// let getPackageRouter = new GetPackageRouter(randomizeService);

const {app,server} = require('./utils/init-app')();



app.use('/',new ViewRouter().router());
// app.use('/api/users',isLoggedIn,new UserRouter(getService, saveService).router());


server.listen(8080,()=>{
    console.log("Application started at port:8080");
});