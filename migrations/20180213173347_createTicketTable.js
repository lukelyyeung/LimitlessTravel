exports.up = function (knex, Promise) {
    return knex.schema.createTable('ticketinfo', (table => {
        table.increments('ticketId');
        table.string('vendor');
        table.string('origin');
        table.string('destination');
        table.string('airportFrom');
        table.string('airportTo');
        table.date('dayFrom');
        table.date('dayTo');
        table.string('flightCode');
        table.float('price');
        table.timestamps(false, true);
    }))
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('ticketinfo');
};