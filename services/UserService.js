// Provide table name in postgresql
const {
    users,
    userPackage,
    packages,
    tickets,
    rooms,
    airlines,
    hotels
} = require('./tableName');
const moment = require('moment');

class UserService {
    constructor(knex) {
        this.knex = knex;
    }

    checkPackageHistory(packageId, trend) {
        console.log('history are called');
        return this.knex.select(['packages.*', 'tickets.*', 'rooms.*', 'hotels.*', 'a.name as departure_airline_name', 'd.name as return_airline_name'])
            .from('packages')
            .join('tickets', 'packages.package_id', 'tickets.package_id')
            .join('airlines as a', 'tickets.return_airline', 'a.id')
            .join('airlines as d', 'tickets.departure_airline', 'd.id')
            .join('rooms', 'tickets.ticket_id', 'rooms.ticket_id')
            .join('hotels', 'rooms.hotel_id', 'hotels.hotel_id')
            .andWhere('packages.package_id', packageId)
            // .where('effect_date', "=", moment().format('YYYY-MM-DD'))
            .where('effect_date',trend , moment().format('YYYY-MM-DD'))
            .catch(console.error);
    }

    checkUserPackage(userId) {
        return this.knex.select(['userpackage.*', 'packages.*'])
            .from('userpackage')
            .join('packages', 'userpackage.package_id', 'packages.package_id')
            .where('userpackage.user_id', userId)
            .catch(console.error);
    }

    userList() {
        return this.knex(users).select('*');
    }

    delete(id, packageId) {
        return this.knex(userPackage).select('*').where({
            user_id: id,
            package_id: packageId
        }).del();
    }

    update(id, userProfile) {
        return this.knex(users).where('id', id).update(userProfile).returning('id');
    }

}

module.exports = UserService;