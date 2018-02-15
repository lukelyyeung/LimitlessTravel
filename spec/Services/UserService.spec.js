const userService = require('../../services/UserService');
const knexFile = require('../../knexfile')['testing'];
const knex = require('knex')(knexFile);

describe("userService ", () => {

    let userService;
    let userId = 15;
    let packageId = 30;
    let example = {
        username: "John",
        email: "john.doe@gmail.com",
        facebookId: "facebookId",
        googleId: "",
    }

    let example2 = {
        username: "John",
        email: "john.doe@gmail.com",
        facebookId: "facebookId",
        googleId: "googleId",
    }

    beforeEach((done) => {
        userService = new userService(knex);
        knex('users').del().then(() => done());
        knex('user-package').del().then(() => done());
    });

    it("should support create user method", (done) => {  //user should pass the object into corresponding key & check duplicate email & add id to the corresponding id 
        userService.create(example)
            .then(() => userService.userList())
            .then((data) => {
                expect(data.length).toEqual(1);
                expect(data[0].first_name).toEqual("John");
                done();
            });
    });

    it("should merge users with create user method", (done) => {  //should check duplicate email & add id to the corresponding id 
        userService.create(example)
            .then(userService.create(example2))
            .then(() => userService.userList())
            .then((data) => {
                expect(data.length).toEqual(1);
                expect(data[0].googleId).toEqual("googleId");
                done();
            });
    });

    it("should support update method", (done) => {  // update corresponding field of the user; 
        userService.create(example)
        .then((ids) => userService.update(ids[0], { first_name: "Peter" }))
        .then(() => userService.list())
        .then((data) => {
            expect(data.length).toEqual(1)
            expect(data[0].first_name).toEqual("Peter");
            done();
        })
    });
    
    it("should support list method", (done) => {   // Get user's all package
        knex('user-package').insert(userId).into('userId').insert(packageId).into('packageId') // To test the packlist function independently
            .then(() => userService.packageList(userId))
            .then((data) => {
                expect(data.length).toEqual(1)
                expect(data[0].packageId).toEqual(packageId);
                done();
            })
    });

    it("should support add user-package method", (done) => {   //add should add a user-package relation
        userService.create(example)
            .then((ids) => userService.add(ids[0], packageId))
            .then((ids) => userService.packageList(ids[0]))
            .then((data) => {
                expect(data[0].packageId).toEqual(packageId);
                done();
            });
        });
        
        it("should support delete user-package method", (done) => {   //delete should delete a user-package relation
            // knex('user-package').insert(userId).into('userId').insert(packageId).into('packageId')
            userService.add(ids, packageId)
            .then((ids) => userService.delete(ids[0], packageId))
            .then((ids) => userService.packageList(ids[0]))
            .then((data) => {
                expect(data.length).toEqual(0);
                done();
            });
    });

});

