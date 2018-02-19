exports.up = function (knex, Promise) {
    return knex.schema.createTable('tickets', (table => {
        table.increments('id');
        table.integer('package_id');
        table.integer('airline_id');
        table.string('flight_code');
        table.string('airport_from');
        table.string('airport_to');
        table.date('day_from');
        table.date('day_to');
        table.float('flight_price');
        table.timestamps(false, true);
    }))
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('tickets');
};