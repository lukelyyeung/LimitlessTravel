class UserService {
    constructor(knex) {
        this.knex = knex;
    }

    findOrCreate(userProfile) {
        let reProfile = {
            name: userProfile.name,
            email: userProfile.email[0].value,
            [userProfile.provider]: userProfile.id
        }

        return this.knex(users).where(userProfile.provider, userProfile.id)
            .then((user) => {
                return (user.length === 0) ? this.create(reProfile, userProfile) :user;
            })
            .catch((err) => {
                console.log(err);
                return -1;
            });
    }


    create(reProfile) {
        return this.knex.transaction(trx => {
            if (typeof reProfile.email !== 'undefine') {

                return this.knex(users).transacting(trx).select('email').where('email', reProfile.email)
                    .then((email) => {
                        if (email.length === 0) {
                            return this.knex(users).insert(reProfile)
                        } else {
                            return this.knex(users).where('email', reProfile.email).update(reProfile);
                        }
                    })
                    .then(() => { trx.commit })
                    .catch(() => { trx.rollback })
                    .then(() => { return this.knex(users).where('email', reProfile.email) })
                    .catch(err => {
                        console.log(err);
                        return -1;
                    })
            } else {
                return this.knex(users).insert(reProfile).returning('*');
            }
        })
    }

    userList() {
        return this.knex(users).select('*');
    }
    
    addPackage(id, packageId) {
        return this.knex(userPackage).insert({ user_id: id, package_id: packageId }).returning('*')
            .catch(err => {
                console.log(err);
                return -1;
            })
    }

    packageList(id) {
        return this.knex(userPackage).select('*').where('user_id', id);
    }    

    delete(id, packageId) {
        return this.knex(userPackage).select('*').where('user_id', id).where('package_id', packageId).del();
    }

    update(id, userProfile) {
        return this.knex(users).where('id', id).update(userProfile).returning('id');
    }

    // async findOrCreate(userProfile) {
    //     let reProfile = await new Promise((resolve, reject) => {
    //         resolve({
    //             name: userProfile.username,
    //             email: userProfile.email[0].value,
    //             [userProfile.provider]: userProfile.id
    //         });
    //     });

    //     let id = await knex(users).select('id').where(userProfile.provider, userProfile.id);
    //     return (id.length > 0) ? id : this.create(reProfile, userProfile);
    // }
}

module.exports = UserService;