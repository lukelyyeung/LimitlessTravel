exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').unique().unsigned();
        table.string("name");
        table.string("email");
        table.string("facebook"); 
        table.string("google"); 
        table.string("instagram"); 
        table.timestamps(false, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};
