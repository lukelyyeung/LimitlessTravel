const {
    users,
    userPackage,
    packages,
    tickets,
    rooms,
    airlines,
    hotels
} = require('./tableName');

class PackageService {
    constructor(knex, FlightService, AccomodationService) {
        this.knex = knex;
        this.flightService = new FlightService(knex);
        this.accomodationService = new AccomodationService(knex);
    }

    findOrCreateUserPackage(userId, packageInfo) {
        return this.knex(packages).select('package_id').where({
            day_from: packageInfo.day_from,
            day_to: packageInfo.day_to,
            city_from: packageInfo.city_from,
            city_to: packageInfo.city_to
        })
            .then((ids) => {
                if (ids.length === 0) {
                    console.log('creating new package');
                    return this.createPackage(userId, packageInfo);
                } else {
                    return this.knex(userPackage).insert({
                        user_id: userId,
                        package_id: ids[0].id
                    })
                        .then(() =>'Package exists')}
            })
            .catch((err) => {
                console.log(err);
                return -1;
            })
    }

    createPackage(userId, packageInfo) {
        // return this.knex.transaction(trx => {
        // return this.knex(packages).transacting(trx)
        return this.knex(packages)
            .insert({
                day_from: packageInfo.day_from,
                day_to: packageInfo.day_to,
                city_from: packageInfo.city_from,
                city_to: packageInfo.city_to
            })
            .returning('package_id')
            .then((id) => {
                console.log('created package with ', id)
                return this.knex(userPackage).insert({
                    user_id: userId,
                    package_id: id[0]
                })
                    .returning('package_id')
            })
        .then((id) => {
            console.log('created User-Package with ' , id);
            return this.flightService.addTicket(id[0], packageInfo);
        })
        .then((id) => {
            console.log('created ticket with ' , id);
            return this.accomodationService.addRooms(id[0], packageInfo);
        })
        // .then(trx.commit)
        // .catch(trx.rollback)
        .catch(console.log);
    }

    updatePackage(newPackagesInfo) {
        return this.knex(packages)
            .select('package_id')
            .where({
                day_from: newPackagesInfo.day_from,
                day_to: newPackagesInfo.day_to,
                city_from: newPackagesInfo.city_from,
                city_to: newPackagesInfo.city_to
            })
            .then((id) => {
                console.log(id);
                return this.flightService.addTicket(id[0].package_id, newPackagesInfo);
            })
            .then((id) => {
                console.log(id);
                return this.accomodationService.addRooms(id[0], newPackagesInfo);
            })
            .then((id) => {
                console.log(id);
                return 'Package updated.'
            })
            .catch(console.log);
    }

    checkPackageHistory(packageId, sequence) {
        return this.knex('packages')
            .join('tickets', {
                'packages.package_id': 'tickets.package_id'
            })
            .join('rooms', {
                'tickets.ticket_id': 'rooms.ticket_id'
            })
            .join('hotels', {
                'rooms.hotel_id': 'hotels.hotel_id'
            })
            .where('packages.package_id', packageId)
            .orderBy('effect_date', sequence);
    }

    checkUserPackage(userId, sequence) {
        return this.knex('userpackage')
            .join('packages', {
                'userpackage.package_id': 'packages.package_id'
            })
            .join('tickets', {
                'packages.package_id': 'tickets.package_id'
            })
            .join('rooms', {
                'tickets.ticket_id': 'rooms.ticket_id'
            })
            .join('hotels', {
                'rooms.hotel_id': 'hotels.hotel_id'
            })
            .where('userpackage.user_id', userId)
            .orderBy('effect_date', sequence);
    }
}

module.exports = PackageService;