exports.up = function (knex, Promise) {
    return knex.schema.createTable('travel_spots', (table) => {
        table.increments('spotId');
        table.string('airportCode', 3).unique();
        table.string('city');
        table.string('country');
        table.string('region');
        table.timestamps(false, true);
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('travel_spots');
};
