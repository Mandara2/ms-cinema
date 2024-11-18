import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'screenings'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.datetime("date")
      table.integer("theater_id").unsigned()
                                .references("theaters.id") //nombre de la tabla y el nombre de la columna
                                .onDelete("CASCADE") 
      table.integer("movie_id").unsigned()
                                .references("movies.id") //nombre de la tabla y el nombre de la columna
                                 .onDelete("CASCADE")
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
