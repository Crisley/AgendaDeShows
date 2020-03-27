
exports.up = function(knex) {
  return knex.schema.createTable('musicas', function(table){
    table.increments();
    table.string('nome').notNullable();
    table.string('ritmo').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('musicas');
};
