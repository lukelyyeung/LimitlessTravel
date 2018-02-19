exports.up = function (knex, Promise) {
    return knex.schema.createTable('userpackage', (table) => {
        table.increments('id');
        table.integer('package_id');
        table.integer('user_id');
        table.timestamps(false, true);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('userpackage');
};