exports.up = function (knex, Promise) {
    return knex.schema.createTable('hotels', (table) => {
        table.increments('hotel_id').unique().unsigned();
        table.string('property_name');
        table.jsonb('address');
    });
}

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('hotels');
};
