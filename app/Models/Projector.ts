import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Theater from './Theater'

export default class Projector extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public brand:string

  @column()
  public high: number //va con number ya que integer es propio de la base de batos

  @column()
  public width: number

  @column()
  public theater_id: number

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