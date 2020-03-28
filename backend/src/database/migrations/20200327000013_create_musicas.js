
exports.up = function(knex) {
  return knex.schema.createTable('musicas', function(table){
    table.increments();
    table.string('nome').notNullable();
    table.string('ritmo').notNullable();
    table.string('banda_id').notNullable();

    table.foreign('banda_id').references('id').inTable('bandas');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('musicas');
};
