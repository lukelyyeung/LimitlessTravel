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

    async checkPackageHistory(packageId, trend) {
        try {
            let activePackage;
            if (trend === '=') {
                activePackage = await this.getHistory(packageId, '=', moment().format('YYYY-MM-DD'));

                if (activePackage.length === 0) {
                    activePackage = await this.getHistory(packageId, '=', moment().add(-1, 'days').format('YYYY-MM-DD'));
                }

            } else if (trend === '<') {
                activePackage = await this.getHistory(packageId, '<', moment().add(1, 'days').format('YYYY-MM-DD'));
            }

            return activePackage;

        } catch (error) {
            console.log(error);
        }
    }

    async getHistory(packageId, operator, criteria) {
        try {
            return await this.knex.select(['packages.*', 'tickets.*', 'rooms.*', 'hotels.*', 'a.name as departure_airline_name', 'd.name as return_airline_name'])
                .from('packages')
                .join('tickets', 'packages.package_id', 'tickets.package_id')
                .join('airlines as a', 'tickets.return_airline', 'a.id')
                .join('airlines as d', 'tickets.departure_airline', 'd.id')
                .join('rooms', 'tickets.ticket_id', 'rooms.ticket_id')
                .join('hotels', 'rooms.hotel_id', 'hotels.hotel_id')
                .where('effect_date', operator, criteria)
                .andWhere('packages.package_id', packageId)
                .orderBy('effect_date', 'asc');

        } catch (error) {
            console.log(error);
        }
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

    async delete(userId, packageId) {
        return await this.knex(userPackage).select('*').where({
            user_id: userId,
            package_id: packageId
        }).del();
    }

    update(id, userProfile) {
        return this.knex(users).where('id', id).update(userProfile).returning('id');
    }

}

module.exports = UserService;