exports.up = function (knex, Promise) {
    return knex.schema.createTable('airlines', (table) => {
        table.increments('primary_id').primary();
        table.string('id');
        table.integer('lcc');
        table.string('name');
    });
}

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('airlines');
};
