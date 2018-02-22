exports.up = function (knex, Promise) {
    return knex.schema.createTable('userpackage', (table) => {
        table.increments('id').unique().unsigned();
        table.integer('package_id');
        table.foreign('package_id').references('packages.package_id')
        table.integer('user_id');
        table.foreign('user_id').references('users.id')
        table.timestamps(false, true);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('userpackage');
};