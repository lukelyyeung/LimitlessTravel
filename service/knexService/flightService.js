const {
    users,
    userPackage,
    packages,
    tickets,
    bookings,
    airlines,
    hotels
} = require('../table')
const knexFile = require('../../knexfile')['development'];
const knex = require('knex')(knexFile);
const Airlines = require('../../seeds/airlines.json')

class FlightService {
    constructor(knex) {
        this.knex = knex;
    }

    // updateAirline(airlinesUpdate) {
    //     airlinesUpdate.forEach(airline => {
    //         this.knex(airlines).where('id', airline.id).update(airline)
    //             .returning('*')
    //             .then(console.log)
    //             .catch(err => console.log(err))
    //     })
    // }

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
        return knex(tickets).insert({
            package_id: packageId,
            airline_id: wholePackage.airline_id,
            flight_code: wholePackage.flight_code,
            airport_from: wholePackage.airport_from,
            airport_to: wholePackage.airport_to,
            day_from: wholePackage.day_from,
            day_to: wholePackage.day_to,
            flight_price: wholePackage.flight_price
        }).returning('*')
    }

    checkTicketHistory(packageId, sequence) {
        return this.knex(tickets)
            .join(airlines, 'tickets.airline_id', airline.id)
            .where({ package_id: packageId })
            .orderBy('effective_date', sequence);
    }
}