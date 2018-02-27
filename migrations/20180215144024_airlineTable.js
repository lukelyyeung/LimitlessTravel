exports.up = function (knex, Promise) {
    return knex.schema.createTable('airlines', (table) => {
        table.increments('primary_id').unsigned();
        table.string('id', 2);
        table.integer('lcc');
        table.string('name');
    });
}

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('airlines');
};
