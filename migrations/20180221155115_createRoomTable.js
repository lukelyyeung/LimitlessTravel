exports.up = function (knex, Promise) {
    return knex.schema.createTable('rooms', (table) => {
        table.increments('room_id').unique().unsigned();
        table.integer('ticket_id');
        table.foreign('ticket_id').references('tickets.ticket_id');
        table.integer('hotel_id');
        table.foreign('hotel_id').references('hotels.hotel_id');
        table.float('hotel_price');
        table.date('effect_date');
        table.timestamps(false, true);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('rooms');
};
