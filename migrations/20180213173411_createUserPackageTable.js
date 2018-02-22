exports.up = function (knex, Promise) {
    return knex.schema.createTable('hotelinfo', (table) => {
        table.increments('hotelId');
        table.string('hotelName');
        table.string('city');
        table.json('location');
        table.float('price');
        table.string('roomType');
        table.date('dayFrom');
        table.date('dayTo');
        table.timestamps(false, true);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('hotelinfo');
};
