exports.up = function (knex, Promise) {
    return knex.schema.createTable('hotels', (table) => {
        table.increments('id');
        table.string('hotel_name');
        table.string('city');
        table.json('location');
    });
}

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('hotels');
};
