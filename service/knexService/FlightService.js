const {
    users,
    userPackage,
    packages,
    tickets,
    rooms,
    airlines,
    hotels
} = require('./tableName');

class FlightService {
    constructor(knex) {
        this.knex = knex;
    }

    updateAirline(airlinesUpdate) {
        return this.knex.transaction(trx => {
            return this.knex(airlines).transacting(trx).truncate()
                .then(() => {
                    return this.knex.batchInsert(airlines, airlinesUpdate, 100).transacting(trx)
                })
                .then(trx.commit)
                .catch(trx.rollback)
        })
    }

    addTicket(packageId, wholePackage) {
        return this.knex(tickets).insert({
            package_id: packageId,
            id: wholePackage.airline_id,
            flight_code: wholePackage.flight_code,
            airport_from: wholePackage.airport_from,
            airport_to: wholePackage.airport_to,
            day_from: wholePackage.day_from,
            day_to: wholePackage.day_to,
            flight_price: wholePackage.flight_price
        })
        .returning('ticket_id')
    }

}

module.exports = FlightService;