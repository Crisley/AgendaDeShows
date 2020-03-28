
exports.up = function (knex) {
    return knex.schema.createTable('bandas', function (table) {
        table.string('id').primary();
        table.string('nome').notNullable();       
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('bandas');
};
