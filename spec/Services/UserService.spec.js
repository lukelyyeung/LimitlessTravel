const UserService = require('../../service/userService/UserService');
const knexFile = require('../../knexfile')['development'];
const knex = require('knex')(knexFile);

describe("userService ", () => {

    let userService;
    let userId = 15;
    let packageId = 30;
    let example = {
        username: "JohnSo",
        email: [{ value: "john.doe@gmail.com" }],
        provider: "facebook",
        id: "1234"
    }

    let example2 = {
        username: "John",
        email: [{ value: "john.doe@gmail.com" }],
        provider: "google",
        id: "4321"
    }

    beforeEach((done) => {
        userService = new UserService(knex);
        knex('users').del().then(() => done());
        knex('userpackage').del().then(() => done());
    });
    afterEach((done) => {
        userService = new UserService(knex);
        knex('users').del().then(() => done());
        knex('userpackage').del().then(() => done());
    });

    it("should support create user method", async function (done) {  //user should pass the object into corresponding key & check duplicate email & add id to the corresponding id 
        userService.findOrCreate(example)
            .then(() => userService.userList())
            .then((data) => {
                expect(data.length).toEqual(1);
                expect(data[0].name).toEqual("JohnSo");
                done();
            });
    });

    it("should merge users with create user method", (done) => {  //should check duplicate email & add id to the corresponding id 
        userService.findOrCreate(example)
            .then(() => userService.findOrCreate(example2))
            .then(() => userService.userList())
            .then((data) => {
                expect(data.length).toEqual(1);
                expect(data[0]['google']).toEqual("4321");
                done();
            })
    });

    xit("should support update method", (done) => {  // update corresponding field of the user; 
        userService.findOrCreate(example)
            .then(() => userService.userList())
            .then((ids) => userService.update(ids[0].id, { name: "Peter" }))
            .then(() => userService.userList())
            .then((data) => {
                console.log(data);
                expect(data.length).toEqual(1);
                expect(data[0].name).toEqual("Peter");
                done();
            })
    });

    it("should support list method", (done) => {   // Get user's all package
        knex('userpackage').insert({
            user_id: userId,
            package_id: packageId
        })
            .then(() => userService.packageList(userId))
            .then((data) => {
                expect(data.length).toEqual(1)
                expect(data[0].package_id).toEqual(packageId);
                done();
            })
    });

    it("should support add user-package method", (done) => {   //add should add a user-package relation
        userService.add(userId, packageId)
            .then((ids) => userService.packageList(ids[0]))
            .then((data) => {
                expect(data.length).toEqual(1)
                expect(data[0].package_id).toEqual(packageId);
                done();
            });
    });

    it("should support delete user-package method", (done) => {   //delete should delete a user-package relation
        userService.add(userId, packageId)
            .then((ids) => userService.delete(ids[0], packageId))
            .then(() => userService.packageList(userId))
            .then((data) => {
                expect(data.length).toEqual(0);
                done();
            });
    });

});
