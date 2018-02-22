exports.up = function (knex, Promise) {
    return knex.schema.createTable('userpackage', (table) => {
        table.increments('id');
        table.integer('packageId');
        table.integer('userId');
        table.timestamps(false, true);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('userpackage');
};