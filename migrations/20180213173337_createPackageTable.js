exports.up = function(knex, Promise) {
  return knex.schema.createTable('packageinfo', (table) => {
      table.increments('packageId');
      table.integer('flightId');
      table.integer('hotelId');
      table.timestamps(false, true);
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('packageinfo');
};
