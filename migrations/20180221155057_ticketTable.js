exports.up = function (knex, Promise) {
    return knex.schema.createTable('tickets', (table => {
        table.string('departure_airline', 2)
        table.string('return_airline', 2)
        table.increments('ticket_id').unique().unsigned();
        table.integer('package_id');
        table.foreign('package_id').references('packages.package_id');
        table.jsonb('departure_details');
        table.jsonb('return_details');
        table.float('total_price');
        table.float('flight_price');
        table.text('deep_link');
        table.timestamps(false, true);
    }))
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('tickets');
};