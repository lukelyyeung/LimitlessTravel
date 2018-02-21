// const HotelService = require('../../services/HotelService');
// const knexFile = require('../../knexfile')['testing'];
// const knex = require('knex')(knexFile);

// describe("hotelService ", () => {

//     let hotelService;
//     let example1 = {
//         name: 'Grand Austria Hotel',
//         city: 'salzburg',
//         location:[100, 100],
//         dayFrom: '2010-04-24',
//         dayTo: '2010-04-28',
//         roomType:'Suite'
//     };
//     let example2 = {
//         name: 'Cheap Austria Hotel',
//         city: 'galzburz',
//         location:[80, 80],
//         dayFrom: '2017-04-24',
//         dayTo: '2017-04-28',
//         roomType:'Standard'
//     };

//     beforeEach((done) => {
//         hotelService = new HotelService(knex);
//         knex('hotels').del().then(() => done());
//     });

//     it("should support add method", (done) => {
//         hotelService.add(example)
//             .then((ids) => hotelService.list())
//             .then((data) => {
//                 expect(data.length).toEqual(1);
//                 expect(data[0].name).toEqual("Grand Austria Hotel");
//                 done();
//             });
//     });

//     it("should support delete hotel method with new Date object", (done) => {   //delete should delete a hotel booking where timestamp < today 
//         let day =
//             hotelService.add(example)
//                 .then(() => hotelService.delete(new Date('2010-04-24')))  // with the usage of lodash function _.isEqual(value, other)
//                 .then(() => hotelService.list())
//                 .then((data) => {
//                     expect(data.length).toEqual(0);
//                     done();
//                 });
//     });


//     it("should support update method", (done) => {
//         hotelService.add(example)
//             .then((ids) => hotelService.update(ids[0], example2))
//             .then(() => hotelService.list())
//             .then((data) => {
//                 expect(data.length).toEqual(1)
//                 expect(data[0].name).toEqual('Cheap Austria Hotel');
//                 done();
//             })
//     });

// });