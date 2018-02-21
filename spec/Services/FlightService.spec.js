// const FlightService = require('../../services/FlightService');
// const knexFile = require('../../knexfile')['testing'];
// const knex = require('knex')(knexFile);

// describe("flightService ", () => {

//     let flightService;
//     let example1 = {
//         vendor: 'Cathy',
//         orgin: 'HKG',
//         destination: 'NYC',
//         aiportFrom: 'HKG',
//         aiportTo: 'NYC',
//         dayFrom: '2010-04-24',
//         dayTo: '2010-04-28',
//         flightCode: 'CA789',
//         price: 8000.19
//     };
//     let example2 = {
//         vendor: 'Hong Kong Airline',
//         orgin: 'HKG',
//         destination: 'NYC',
//         aiportFrom: 'HKG',
//         aiportTo: 'NYC',
//         dayFrom: '2010-04-24',
//         dayTo: '2010-04-28',
//         flightCode: 'HX984',
//         price: 7000.19
//     };

//     beforeEach((done) => {
//         flightService = new FlightService(knex);
//         knex('flights').del().then(() => done());
//     });

//     it("should support add method", (done) => {
//         flightService.add(example)
//             .then((ids) => flightService.list())
//             .then((data) => {
//                 expect(data.length).toEqual(1);
//                 expect(data[0].vendor).toEqual("Cathy");
//                 done();
//             });
//     });

//     it("should support delete flight method with new Date object", (done) => {   //delete should delete a flight booking where timestamp < today 
//         let day =
//             flightService.add(example)
//                 .then(() => flightService.delete(new Date('2010-04-24')))  // with the usage of lodash function _.isEqual(value, other)
//                 .then(() => flightService.list())
//                 .then((data) => {
//                     expect(data.length).toEqual(0);
//                     done();
//                 });
//     });


//     it("should support update method", (done) => {
//         flightService.add(example)
//             .then((ids) => flightService.update(ids[0], example2))
//             .then(() => flightService.list())
//             .then((data) => {
//                 expect(data.length).toEqual(1)
//                 expect(data[0].vendor).toEqual('Hong Kong Airline');
//                 done();
//             })
//     });

// });