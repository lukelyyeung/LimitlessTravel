exports.up = function (knex, Promise) {
    return knex.schema.createTable('bookingticket', (table) => {
        table.increments('bookingticket_id');
        table.integer('ticket_id');
        table.integer('hotel_id');
        table.float('hotel_price');
        table.date('effect_date');
        table.timestamps(false, true);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('bookingticket');
};
