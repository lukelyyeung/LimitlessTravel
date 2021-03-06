exports.up = function(knex, Promise) {
  return knex.schema.createTable('packages', (table) => {
      table.increments('package_id').unique().unsigned();
      table.float('budget');
      table.date('day_from');
      table.date('day_to');
      table.string('city_from');
      table.string('city_to');
      table.timestamps(false, true);
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('packages');
};
