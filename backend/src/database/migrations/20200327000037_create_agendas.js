
exports.up = function(knex) {
    return knex.schema.createTable('agendas', function(table){
        table.increments();
        table.dateTime('data_hora').notNullable();
        table.string('rua').notNullable();
        table.string('numero');
        table.string('bairro').notNullable();
        table.string('cidade').notNullable();
        table.string('contratante').notNullable();
        table.decimal('cache').notNullable();
        table.string('status').notNullable();
      });
};

exports.down = function(knex) {
  return knex.schema.dropTable('agendas');
};
