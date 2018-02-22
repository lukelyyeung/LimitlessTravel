exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', (table) => {
        table.increments('userId');
        table.string("userName");
        table.string("facebookId"); 
        table.string("googleId"); 
        table.string("instagramId"); 
        table.timestamps(false, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};
