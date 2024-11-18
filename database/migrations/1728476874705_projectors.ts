import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'projectors'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('brand')
      table.integer('high')
      table.integer('width')
      table.integer('theater_id').unsigned().references("theaters.id").onDelete('CASCADE') //se utiliza unsigned cuando las foraneas son numericas, tiene que ser al nombre de la tabla
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
