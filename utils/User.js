const {
    users,
    userPackage,
    packages,
    tickets,
    rooms,
    airlines,
    hotels
} = require('../services/tableName');

class User {
    constructor(knex) {
        this.knex = knex;
    }

    findOrCreateUser(userProfile) {
        return this.knex(users).where(userProfile)
            .then((user) => {
                return (user.length === 0) ? this.createUser(userProfile) : user;
            })
            .catch((err) => {
                console.log(err);
                return -1;
            });
    }

    createUser(userProfile) {
        return this.knex.transaction(trx => {
            if (typeof userProfile.email !== 'undefine' | userProfile.email !== null) {

                return this.knex(users).transacting(trx).select('email').where('email', userProfile.email)
                    .then((email) => {
                        if (email.length === 0) {
                            return this.knex(users).insert(userProfile);
                        } else {
                            return this.knex(users).where('email', userProfile.email).update(userProfile);
                        }
                    })
                    .then(() => { trx.commit })
                    .catch(() => { trx.rollback })
                    .then(() => { return this.knex(users).where('email', userProfile.email) })
                    .catch(err => {
                        console.log(err);
                        return -1;
                    })
            } else {
                return this.knex(users).insert(userProfile).returning('*');
            }
        })
    }
}

module.exports = User;