
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('travel_spots', (table) => {
    table.jsonb('location')
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('travel_spots', (table) => {
        table.dropColumn('location');
      })
};
