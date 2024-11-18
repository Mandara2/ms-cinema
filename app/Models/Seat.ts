import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Theater from './Theater'

export default class Seat extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public location: string

  @column()
  public reclining: boolean

  @column()
  public theater_id: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Theater, {
    //Este es el nombre de la clave foraneas 
    foreignKey: 'theater_id'
  })
  public theater: BelongsTo<typeof Theater>
}
