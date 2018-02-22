exports.up = function (knex, Promise) {
    return knex.schema.createTable('hotels', (table) => {
        table.increments('hotel_id').unique().unsigned();
        table.string('hotel_name');
        table.string('city');
        table.jsonb('location');
    });
}

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('hotels');
};
