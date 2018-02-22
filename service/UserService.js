const users = require('../table').USERS;
const userPackage = require('../table').USERPACKAGE;
class UserService {
    construtor(knex) {
        this.knex = knex;
    }

    findOrCreate(userProfile) {
        return this.knex(users).insert(userProfile).returning('id');
    }
    // findOrCreate(userProfile) {
    //     knex(users).select('id').where(userProfile.provider, userProfile.id)
    //         .then((id) => {
    //             return (!id) ? create(userProfile) : id;
    //         });
    // }

    // create(userProfile) {
    //     return knex.transaction(trx => {
    //         if (typeof userProfile.emails[0].value !== 'undefine') {

    //             knex(users).transacting(trx).select('email').where('email', userProfile.email[0].value)
    //                 .then((reapeatedEmail) => {
    //                     if (reapeatedEmail) {
    //                         return this.knex(users).update(userProfile.provider, userProfile.id);
    //                     }
    //                 })
    //         }
    //         return this.knex(users).insert(userProfile).returning('id');
    //     })
    //         .then(trx.commit)
    //         .catch(trx.rollback);
    // }

    // update(id, userProfile) {
    //     this.knex(users).udpate(userProfile).where('id', id);
    // }

    userList() {
        this.knex(users).select('*');
    }

    // packageList(id) {
    //     this.knex(userpackage).select('*').where('user_id', id);
    // }

    // delete(id, packageId) {
    //     this.knex(userpackage).select('*').where({ 'user_id': id, 'package_id': packageId }).del();
    // }
}

module.exports = UserService ;