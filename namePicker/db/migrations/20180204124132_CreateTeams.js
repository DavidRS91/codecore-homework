
exports.up = function(knex) {
  return knex.schema
    .createTable('teams', table => {
      table.increments('id');
      table.string('teamName'); //creates a column 'username' with type string
      table.text('teamMembers');
      table.string('pictureUrl');
      table.timestamps(false,true); //Creates two columns, created_at and updated_at
      //note: getting updated_at to update requires significantly more sql
    })

};

exports.down = function(knex) {
  return knex.schema.dropTable('teams')
};
