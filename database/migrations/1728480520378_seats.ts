import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'seats'

  public async up () { //Se utiliza async para esperar la respuesta de la base de datos que puede llegar a ser lenta, es una buena practica
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('location')
      table.boolean('reclining')
      table.integer('theater_id').unsigned().references("theaters.id").onDelete("CASCADE") //eL ONdELETE ES LA COMPOSICION, SI SE ELIMINA EL TEATRO SE ELIMINAN LAS SILLAS
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () { //Este metodo se utiliza para revertir los cambios aplicados por el método up
    this.schema.dropTable(this.tableName)
  }
}

//Unisgned se utiliza para que la columna no pueda contener valores negativos
//onDelete define cómo se deben manejar las filas relacionadas en una tabla cuando una fila de la tabla referenciada es eliminada.
//CASCADE ignifica que, si se elimina una fila de la tabla theaters, automáticamente se eliminarán todas las filas de la tabla seats que estén asociadas con ese teatro.
//Si un teatro es eliminado todas las sillas relacionadas con este también lo harán.